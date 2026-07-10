import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireUser, UnauthenticatedError } from "@/lib/auth"
import { renderResume } from "@/lib/latex/renderer"
import { compileLatex, CompileError } from "@/lib/latex/compileClient"
import { uploadResumePdf } from "@/lib/storage"
import { ResumeDataSchema, type ResumeData } from "@/types/resume"

type RouteParams = { params: Promise<{ id: string }> }

export async function POST(_request: Request, { params }: RouteParams) {
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
  const resume = await prisma.resume.findUnique({ where: { id } })
  if (!resume) return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  if (resume.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const dataParsed = ResumeDataSchema.safeParse(resume.data)
  if (!dataParsed.success) {
    return NextResponse.json(
      { error: "Resume data is invalid, fix it before compiling", issues: dataParsed.error.issues },
      { status: 400 }
    )
  }
  const data: ResumeData = dataParsed.data

  const lastVersion = await prisma.resumeVersion.findFirst({
    where: { resumeId: id },
    orderBy: { versionNum: "desc" },
  })
  const versionNum = (lastVersion?.versionNum ?? 0) + 1

  const texSource = renderResume(resume.templateId, data)

  try {
    const pdf = await compileLatex(texSource)
    const pdfUrl = await uploadResumePdf(id, versionNum, pdf)

    const version = await prisma.resumeVersion.create({
      data: {
        resumeId: id,
        versionNum,
        data,
        pdfUrl,
        status: "success",
      },
    })

    return NextResponse.json(version, { status: 201 })
  } catch (err) {
    const errorLog = err instanceof CompileError ? err.log : String(err)

    await prisma.resumeVersion.create({
      data: {
        resumeId: id,
        versionNum,
        data,
        status: "failed",
        errorLog,
      },
    })

    return NextResponse.json(
      { error: "Resume failed to compile. Check your entries for issues and try again." },
      { status: 502 }
    )
  }
}
