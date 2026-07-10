const COMPILE_SERVICE_URL = process.env.COMPILE_SERVICE_URL

export class CompileError extends Error {
  constructor(public log: string) {
    super("LaTeX compilation failed")
  }
}

export async function compileLatex(texSource: string): Promise<Buffer> {
  if (!COMPILE_SERVICE_URL) {
    throw new Error("COMPILE_SERVICE_URL is not configured")
  }

  const res = await fetch(`${COMPILE_SERVICE_URL}/compile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texSource }),
  })

  if (!res.ok) {
    const contentType = res.headers.get("content-type") ?? ""
    if (contentType.includes("application/json")) {
      const body = (await res.json()) as { error?: string; log?: string }
      throw new CompileError(body.log ?? body.error ?? "Unknown compile error")
    }
    throw new CompileError(await res.text())
  }

  return Buffer.from(await res.arrayBuffer())
}
