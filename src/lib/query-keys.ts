export const queryKeys = {
  resumes: ["resumes"] as const,
  resumeHistory: ["resume-history"] as const,
  resume: (id: string) => ["resume", id] as const,
  templates: ["templates"] as const,
  versions: (id: string) => ["resume-versions", id] as const,
  compileStatus: (id: string, jobId: string) => ["compile-status", id, jobId] as const,
}
