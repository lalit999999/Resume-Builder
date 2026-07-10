import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireUser, UnauthenticatedError } from "@/lib/auth"
import { getJob } from "@/lib/redis"

type RouteParams = { params: Promise<{ id: string }> }

export async function GET(request: Request, { params }: RouteParams) {
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
  const jobId = new URL(request.url).searchParams.get("jobId")
  if (!jobId) {
    return NextResponse.json({ error: "jobId query parameter is required" }, { status: 400 })
  }

  const resume = await prisma.resume.findUnique({ where: { id } })
  if (!resume || resume.deletedAt || resume.userId !== user.id) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  }

  const job = await getJob(jobId)
  if (job) {
    return NextResponse.json({
      status: job.status,
      pdfUrl: job.pdfUrl,
      errorLog: job.errorLog,
    })
  }

  // Redis job entry missing or expired — fall back to Postgres, the durable record.
  const version = await prisma.resumeVersion.findUnique({ where: { id: jobId } })
  if (!version || version.resumeId !== id) {
    return NextResponse.json({ error: "Compile job not found" }, { status: 404 })
  }

  return NextResponse.json({
    status: version.status,
    pdfUrl: version.pdfUrl ?? undefined,
    errorLog: version.errorLog ?? undefined,
  })
}
