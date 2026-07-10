import type { ResumeData } from "@/types/resume"

export type CompileStatusValue = "queued" | "processing" | "completed" | "failed"

export interface ResumeVersionRow {
  id: string
  resumeId: string
  versionNum: number
  data: ResumeData
  pdfUrl: string | null
  cloudinaryPublicId: string | null
  status: CompileStatusValue
  errorLog: string | null
  createdAt: string
  deletedAt: string | null
}

export interface ResumeRow {
  id: string
  userId: string
  title: string
  templateId: string
  data: ResumeData
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface ResumeWithVersions extends ResumeRow {
  versions: ResumeVersionRow[]
}

export interface ResumeHistoryRow extends ResumeRow {
  template: { id: string; name: string }
  versions: ResumeVersionRow[]
}

export interface TemplateRow {
  id: string
  name: string
  texPath: string
  configPath: string
  description: string | null
  previewImageUrl: string | null
  category: string | null
  tags: string[]
  thumbnailColor: string | null
  popular: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CompileResponse {
  versionId: string
  jobId: string
}

export interface CompileStatusResponse {
  status: CompileStatusValue
  pdfUrl?: string
  errorLog?: string
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message)
  }
}

async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new ApiError(body?.error ?? `Request failed with status ${res.status}`, res.status)
  }

  if (res.status === 204) return undefined as T

  return res.json() as Promise<T>
}

export function listResumes() {
  return request<ResumeRow[]>("/api/resume")
}

export function getResumeHistory() {
  return request<ResumeHistoryRow[]>("/api/resume/history")
}

export function getResume(id: string) {
  return request<ResumeWithVersions>(`/api/resume/${id}`)
}

export function createResume(input: { title: string; templateId: string; data: ResumeData }) {
  return request<ResumeRow>("/api/resume", { method: "POST", body: JSON.stringify(input) })
}

export function updateResume(
  id: string,
  input: { title?: string; templateId?: string; data: ResumeData }
) {
  return request<ResumeRow>(`/api/resume/${id}`, { method: "PUT", body: JSON.stringify(input) })
}

export function deleteResume(id: string) {
  return request<void>(`/api/resume/${id}`, { method: "DELETE" })
}

export function compileResume(id: string) {
  return request<CompileResponse>(`/api/resume/${id}/compile`, { method: "POST" })
}

export function getCompileStatus(id: string, jobId: string) {
  return request<CompileStatusResponse>(
    `/api/resume/${id}/compile/status?jobId=${encodeURIComponent(jobId)}`
  )
}

export function listVersions(id: string) {
  return request<ResumeVersionRow[]>(`/api/resume/${id}/versions`)
}

export function getVersion(id: string, versionId: string) {
  return request<ResumeVersionRow>(`/api/resume/${id}/versions/${versionId}`)
}

export function listTemplates() {
  return request<TemplateRow[]>("/api/templates")
}
