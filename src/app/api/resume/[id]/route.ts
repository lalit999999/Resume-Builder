import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireUser, UnauthenticatedError } from "@/lib/auth"
import { ResumeDataSchema } from "@/types/resume"

const updateResumeSchema = z.object({
  title: z.string().min(1).optional(),
  templateId: z.string().min(1).optional(),
  data: ResumeDataSchema,
})

type RouteParams = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: RouteParams) {
  let user
  try {
    user = await requireUser()
  } catch (err) {
    if (err instanceof UnauthenticatedError) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })
    }
    throw err
  }

  const { id } = await params
  const resume = await prisma.resume.findUnique({ where: { id }, include: { versions: true } })
  if (!resume) return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  if (resume.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  return NextResponse.json(resume)
}

export async function PUT(request: Request, { params }: RouteParams) {
  let user
  try {
    user = await requireUser()
  } catch (err) {
    if (err instanceof UnauthenticatedError) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })
    }
    throw err
  }

  const { id } = await params
  const existing = await prisma.resume.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  if (existing.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const body = await request.json()
  const parsed = updateResumeSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid resume data", issues: parsed.error.issues }, { status: 400 })
  }

  const resume = await prisma.resume.update({
    where: { id },
    data: {
      ...(parsed.data.title !== undefined && { title: parsed.data.title }),
      ...(parsed.data.templateId !== undefined && { templateId: parsed.data.templateId }),
      data: parsed.data.data,
    },
  })

  return NextResponse.json(resume)
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  let user
  try {
    user = await requireUser()
  } catch (err) {
    if (err instanceof UnauthenticatedError) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })
    }
    throw err
  }

  const { id } = await params
  const existing = await prisma.resume.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  if (existing.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  await prisma.resume.delete({ where: { id } })

  return new NextResponse(null, { status: 204 })
}
