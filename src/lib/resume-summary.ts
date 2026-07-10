import type { ResumeHistoryRow } from "@/lib/api-client"
import type { ActivityPoint, DashboardStats } from "@/types/user"
import type { ResumeStatus, ResumeSummary } from "@/types/resume"

function statusFromLatestVersion(row: ResumeHistoryRow): ResumeStatus {
  const latest = row.versions[0]
  if (!latest) return "draft"
  if (latest.status === "completed") return "compiled"
  return latest.status
}

export function toResumeSummary(row: ResumeHistoryRow): ResumeSummary {
  return {
    id: row.id,
    title: row.title,
    templateId: row.templateId,
    templateName: row.template.name,
    status: statusFromLatestVersion(row),
    updatedAt: row.updatedAt,
    downloadCount: 0,
    pdfUrl: row.versions[0]?.pdfUrl ?? undefined,
  }
}

export function computeDashboardStats(rows: ResumeHistoryRow[]): DashboardStats {
  const templateCounts = new Map<string, number>()
  let lastEditedAt: string | null = null

  for (const row of rows) {
    templateCounts.set(row.template.name, (templateCounts.get(row.template.name) ?? 0) + 1)
    if (!lastEditedAt || row.updatedAt > lastEditedAt) lastEditedAt = row.updatedAt
  }

  let mostUsedTemplate = "—"
  let mostUsedCount = 0
  for (const [name, count] of templateCounts) {
    if (count > mostUsedCount) {
      mostUsedTemplate = name
      mostUsedCount = count
    }
  }

  return {
    totalResumes: rows.length,
    // Download counts aren't tracked anywhere yet (no download-event route in scope),
    // so this stays 0 rather than a fabricated number.
    totalDownloads: 0,
    mostUsedTemplate,
    lastEditedAt: lastEditedAt ?? new Date().toISOString(),
  }
}

export function computeActivity(rows: ResumeHistoryRow[]): ActivityPoint[] {
  const byDay = new Map<string, { resumesCreated: number; downloads: number }>()

  for (const row of rows) {
    const day = row.createdAt.slice(0, 10)
    const entry = byDay.get(day) ?? { resumesCreated: 0, downloads: 0 }
    entry.resumesCreated += 1
    byDay.set(day, entry)
  }

  return Array.from(byDay.entries())
    .map(([date, counts]) => ({ date, ...counts }))
    .sort((a, b) => a.date.localeCompare(b.date))
}
