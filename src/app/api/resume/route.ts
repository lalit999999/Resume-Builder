import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireUser, UnauthenticatedError } from "@/lib/auth"
import { ResumeDataSchema } from "@/types/resume"

const createResumeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  templateId: z.string().min(1).default("nitp"),
  data: ResumeDataSchema,
})

export async function POST(request: Request) {
  let user
  try {
    user = await requireUser()
  } catch (err) {
    if (err instanceof UnauthenticatedError) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })
    }
    throw err
  }

  const body = await request.json()
  const parsed = createResumeSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid resume data", issues: parsed.error.issues }, { status: 400 })
  }

  const resume = await prisma.resume.create({
    data: {
      userId: user.id,
      title: parsed.data.title,
      templateId: parsed.data.templateId,
      data: parsed.data.data,
    },
  })

  return NextResponse.json(resume, { status: 201 })
}
