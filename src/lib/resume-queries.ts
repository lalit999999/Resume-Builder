import { prisma } from "@/lib/prisma"
import { getCached, setCached, invalidateCache } from "@/lib/redis"
import type { ResumeHistoryRow, ResumeRow, ResumeVersionRow, TemplateRow } from "@/lib/api-client"
import type { ResumeData } from "@/types/resume"

const LIST_TTL_SECONDS = 45
const HISTORY_TTL_SECONDS = 45
const TEMPLATES_TTL_SECONDS = 10 * 60

function listCacheKey(userId: string) {
  return `resumes:list:${userId}`
}

function historyCacheKey(userId: string) {
  return `history:${userId}`
}

const TEMPLATES_CACHE_KEY = "templates:all"

// Every fetcher below returns plain JSON-safe shapes (ISO date strings, no Prisma
// Date/Decimal instances) so that a Redis cache hit and a Postgres cache miss are
// type-identical — Upstash round-trips through JSON, so a raw Prisma object would
// silently change shape between the two paths.

function toResumeRow(resume: {
  id: string
  userId: string
  title: string
  templateId: string
  data: unknown
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}): ResumeRow {
  return {
    id: resume.id,
    userId: resume.userId,
    title: resume.title,
    templateId: resume.templateId,
    data: resume.data as ResumeData,
    createdAt: resume.createdAt.toISOString(),
    updatedAt: resume.updatedAt.toISOString(),
    deletedAt: resume.deletedAt ? resume.deletedAt.toISOString() : null,
  }
}

function toVersionRow(version: {
  id: string
  resumeId: string
  versionNum: number
  data: unknown
  pdfUrl: string | null
  cloudinaryPublicId: string | null
  status: string
  errorLog: string | null
  createdAt: Date
  deletedAt: Date | null
}): ResumeVersionRow {
  return {
    id: version.id,
    resumeId: version.resumeId,
    versionNum: version.versionNum,
    data: version.data as ResumeData,
    pdfUrl: version.pdfUrl,
    cloudinaryPublicId: version.cloudinaryPublicId,
    status: version.status as ResumeVersionRow["status"],
    errorLog: version.errorLog,
    createdAt: version.createdAt.toISOString(),
    deletedAt: version.deletedAt ? version.deletedAt.toISOString() : null,
  }
}

export async function getResumesForUser(userId: string): Promise<ResumeRow[]> {
  const cached = await getCached<ResumeRow[]>(listCacheKey(userId))
  if (cached) return cached

  const resumes = await fetchResumes(userId)
  await setCached(listCacheKey(userId), resumes, LIST_TTL_SECONDS)
  return resumes
}

async function fetchResumes(userId: string): Promise<ResumeRow[]> {
  const rows = await prisma.resume.findMany({
    where: { userId, deletedAt: null },
    orderBy: { updatedAt: "desc" },
  })
  return rows.map(toResumeRow)
}

export async function getResumeHistoryForUser(userId: string): Promise<ResumeHistoryRow[]> {
  const cached = await getCached<ResumeHistoryRow[]>(historyCacheKey(userId))
  if (cached) return cached

  const history = await fetchHistory(userId)
  await setCached(historyCacheKey(userId), history, HISTORY_TTL_SECONDS)
  return history
}

async function fetchHistory(userId: string): Promise<ResumeHistoryRow[]> {
  const rows = await prisma.resume.findMany({
    where: { userId, deletedAt: null },
    include: {
      template: { select: { id: true, name: true } },
      versions: {
        where: { deletedAt: null },
        orderBy: { versionNum: "desc" },
        take: 1,
      },
    },
    orderBy: { updatedAt: "desc" },
  })

  return rows.map((row) => ({
    ...toResumeRow(row),
    template: { id: row.template.id, name: row.template.name },
    versions: row.versions.map(toVersionRow),
  }))
}

export async function invalidateResumeCaches(userId: string) {
  await invalidateCache(listCacheKey(userId), historyCacheKey(userId))
}

export async function getActiveTemplates(): Promise<TemplateRow[]> {
  const cached = await getCached<TemplateRow[]>(TEMPLATES_CACHE_KEY)
  if (cached) return cached

  const templates = await fetchTemplates()
  await setCached(TEMPLATES_CACHE_KEY, templates, TEMPLATES_TTL_SECONDS)
  return templates
}

async function fetchTemplates(): Promise<TemplateRow[]> {
  const rows = await prisma.template.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  })
  return rows.map((t) => ({
    id: t.id,
    name: t.name,
    texPath: t.texPath,
    configPath: t.configPath,
    description: t.description,
    previewImageUrl: t.previewImageUrl,
    category: t.category,
    tags: t.tags,
    thumbnailColor: t.thumbnailColor,
    popular: t.popular,
    isActive: t.isActive,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }))
}
