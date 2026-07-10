import { NextResponse, after } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireUser, UnauthenticatedError } from "@/lib/auth"
import { renderResume } from "@/lib/latex/renderer"
import { compileLatex, CompileError } from "@/lib/latex/compileClient"
import { uploadResumePdf } from "@/lib/storage"
import { createJob, updateJob } from "@/lib/redis"
import { invalidateResumeCaches } from "@/lib/resume-queries"
import { ResumeDataSchema, type ResumeData } from "@/types/resume"

// The actual xelatex/pdflatex invocation happens in the separate `compile-service`
// container (see compile-service/README.md), reached over HTTP — this route spawns
// no native binaries itself, but still needs the Node runtime (not Edge) for
// `after()` and for the outbound request to that service.
// NOTE: `compile-service` requires a TeX Live install; a default Vercel deployment
// will not run it. Deploy it separately (Docker on Railway/Render/Fly.io, or a
// self-hosted Node process) and point COMPILE_SERVICE_URL at it.
export const runtime = "nodejs"

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
  if (!resume || resume.deletedAt || resume.userId !== user.id) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  }

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

  const version = await prisma.resumeVersion.create({
    data: {
      resumeId: id,
      versionNum,
      data,
      status: "queued",
    },
  })

  const now = new Date().toISOString()
  await createJob({
    status: "queued",
    resumeId: id,
    versionId: version.id,
    createdAt: now,
    updatedAt: now,
  })

  after(async () => {
    await updateJob(version.id, { status: "processing" })
    await prisma.resumeVersion.update({ where: { id: version.id }, data: { status: "processing" } })

    try {
      const texSource = renderResume(resume.templateId, data)
      const pdf = await compileLatex(texSource)
      const uploaded = await uploadResumePdf(user.id, id, versionNum, pdf)

      await prisma.resumeVersion.update({
        where: { id: version.id },
        data: {
          status: "completed",
          pdfUrl: uploaded.secureUrl,
          cloudinaryPublicId: uploaded.publicId,
        },
      })
      await updateJob(version.id, { status: "completed", pdfUrl: uploaded.secureUrl })
    } catch (err) {
      const errorLog = err instanceof CompileError ? err.log : String(err)
      await prisma.resumeVersion.update({
        where: { id: version.id },
        data: { status: "failed", errorLog },
      })
      await updateJob(version.id, { status: "failed", errorLog })
    }

    await invalidateResumeCaches(user.id)
  })

  return NextResponse.json({ versionId: version.id, jobId: version.id }, { status: 202 })
}
