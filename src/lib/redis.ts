import { Redis } from "@upstash/redis"

let client: Redis | null = null

function getClient(): Redis {
  if (client) return client
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) {
    throw new Error(
      "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set"
    )
  }
  client = new Redis({ url, token })
  return client
}

/** Read-through cache getter. Returns null on cache miss or if Redis is unreachable/unconfigured. */
export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const value = await getClient().get<T>(key)
    return value ?? null
  } catch {
    return null
  }
}

/** Best-effort cache write; failures are swallowed since Redis is not a source of truth. */
export async function setCached(key: string, value: unknown, ttlSeconds: number): Promise<void> {
  try {
    await getClient().set(key, value, { ex: ttlSeconds })
  } catch {
    // caching is an optimization, not a requirement
  }
}

/** Best-effort cache invalidation; failures are swallowed. */
export async function invalidateCache(...keys: string[]): Promise<void> {
  if (keys.length === 0) return
  try {
    await getClient().del(...keys)
  } catch {
    // caching is an optimization, not a requirement
  }
}

export type JobStatus = "queued" | "processing" | "completed" | "failed"

export interface CompileJob {
  status: JobStatus
  resumeId: string
  versionId: string
  pdfUrl?: string
  errorLog?: string
  createdAt: string
  updatedAt: string
}

const JOB_TTL_SECONDS = 60 * 60

export function jobKey(jobId: string): string {
  return `job:${jobId}`
}

export async function createJob(job: CompileJob): Promise<void> {
  try {
    await getClient().set(jobKey(job.versionId), job, { ex: JOB_TTL_SECONDS })
  } catch {
    // Postgres remains the durable record; a failed Redis write is not fatal.
  }
}

export async function updateJob(jobId: string, patch: Partial<CompileJob>): Promise<void> {
  try {
    const existing = await getClient().get<CompileJob>(jobKey(jobId))
    if (!existing) return
    await getClient().set(
      jobKey(jobId),
      { ...existing, ...patch, updatedAt: new Date().toISOString() },
      { ex: JOB_TTL_SECONDS }
    )
  } catch {
    // Postgres remains the durable record; a failed Redis update is not fatal.
  }
}

export async function getJob(jobId: string): Promise<CompileJob | null> {
  try {
    return await getClient().get<CompileJob>(jobKey(jobId))
  } catch {
    return null
  }
}
