import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireUser, UnauthenticatedError } from "@/lib/auth"
import { ResumeDataSchema } from "@/types/resume"
import { invalidateResumeCaches } from "@/lib/resume-queries"

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
  const resume = await prisma.resume.findUnique({
    where: { id },
    include: { versions: { where: { deletedAt: null } } },
  })
  if (!resume || resume.deletedAt || resume.userId !== user.id) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  }

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
  if (!existing || existing.deletedAt || existing.userId !== user.id) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  }

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

  await invalidateResumeCaches(user.id)

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
  if (!existing || existing.deletedAt || existing.userId !== user.id) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  }

  const deletedAt = new Date()
  await prisma.$transaction([
    prisma.resume.update({ where: { id }, data: { deletedAt } }),
    prisma.resumeVersion.updateMany({ where: { resumeId: id }, data: { deletedAt } }),
  ])

  await invalidateResumeCaches(user.id)

  return new NextResponse(null, { status: 204 })
}
