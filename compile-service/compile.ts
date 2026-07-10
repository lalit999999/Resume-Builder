import { spawn } from "node:child_process"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"

const COMPILE_TIMEOUT_MS = 15_000
const LOG_EXCERPT_LINES = 60

export class LatexCompileError extends Error {
  constructor(public log: string) {
    super("LaTeX compilation failed")
  }
}

/**
 * Compiles a .tex source string to a PDF buffer in an isolated temp directory.
 * Always cleans up the temp directory, even on failure or timeout.
 */
export async function compileTex(texSource: string): Promise<Buffer> {
  const dir = await mkdtemp(path.join(tmpdir(), "resume-"))
  const texPath = path.join(dir, "resume.tex")
  const pdfPath = path.join(dir, "resume.pdf")
  const logPath = path.join(dir, "resume.log")

  try {
    await writeFile(texPath, texSource, "utf8")

    await runPdflatex(texPath, dir)

    return await readFile(pdfPath)
  } catch (err) {
    if (err instanceof LatexCompileError) throw err

    const log = await readFile(logPath, "utf8").catch(() => String(err))
    throw new LatexCompileError(sanitizeLog(log, dir))
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
}

function runPdflatex(texPath: string, cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      "pdflatex",
      [
        "-interaction=nonstopmode",
        "-no-shell-escape",
        "-halt-on-error",
        "-output-directory",
        cwd,
        texPath,
      ],
      { cwd, timeout: COMPILE_TIMEOUT_MS }
    )

    let timedOut = false
    const killTimer = setTimeout(() => {
      timedOut = true
      proc.kill("SIGKILL")
    }, COMPILE_TIMEOUT_MS)

    proc.on("error", (err) => {
      clearTimeout(killTimer)
      reject(new LatexCompileError(String(err)))
    })

    proc.on("close", (code) => {
      clearTimeout(killTimer)
      if (timedOut) {
        reject(new LatexCompileError("Compilation timed out"))
        return
      }
      if (code !== 0) {
        reject(new Error(`pdflatex exited with code ${code}`))
        return
      }
      resolve()
    })
  })
}

function sanitizeLog(log: string, dir: string): string {
  const withoutPaths = log.split(dir).join("<workdir>")
  const lines = withoutPaths.split("\n")
  return lines.slice(-LOG_EXCERPT_LINES).join("\n")
}
