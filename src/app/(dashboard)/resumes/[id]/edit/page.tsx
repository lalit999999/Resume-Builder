import { notFound } from "next/navigation"
import { ResumeBuilderForm } from "@/components/resume-builder/resume-builder-form"
import { requireUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { emptyResumeData, type ResumeRecord, type ResumeStatus } from "@/types/resume"
import { ResumeDataSchema } from "@/types/resume"

function statusFromVersionStatus(status: string): ResumeStatus {
  if (status === "completed") return "compiled"
  return status as ResumeStatus
}

export default async function ResumeEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (id === "new") {
    const resume: ResumeRecord = {
      id: "new",
      title: "Untitled Resume",
      templateId: "nitp",
      status: "draft",
      data: emptyResumeData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      downloadCount: 0,
      versions: [],
    }
    return <ResumeBuilderForm resume={resume} />
  }

  const user = await requireUser()
  const row = await prisma.resume.findUnique({
    where: { id },
    include: { versions: { where: { deletedAt: null }, orderBy: { versionNum: "desc" } } },
  })

  if (!row || row.deletedAt || row.userId !== user.id) {
    notFound()
  }

  const dataParsed = ResumeDataSchema.safeParse(row.data)
  const latest = row.versions[0]

  const resume: ResumeRecord = {
    id: row.id,
    title: row.title,
    templateId: row.templateId,
    status: latest ? statusFromVersionStatus(latest.status) : "draft",
    data: dataParsed.success ? dataParsed.data : emptyResumeData,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    downloadCount: 0,
    versions: row.versions.map((v) => ({
      id: v.id,
      version: v.versionNum,
      createdAt: v.createdAt.toISOString(),
      pdfUrl: v.pdfUrl,
      status: statusFromVersionStatus(v.status),
    })),
  }

  return <ResumeBuilderForm resume={resume} />
}
