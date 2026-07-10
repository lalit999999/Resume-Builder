import express from "express"
import { compileTex, LatexCompileError } from "./compile.ts"

const PORT = process.env.PORT ?? 8080
const MAX_TEX_SOURCE_BYTES = 512 * 1024

const app = express()
app.use(express.json({ limit: "1mb" }))

app.post("/compile", async (req, res) => {
  const { texSource } = req.body ?? {}

  if (typeof texSource !== "string" || texSource.length === 0) {
    res.status(400).json({ error: "texSource is required" })
    return
  }
  if (Buffer.byteLength(texSource, "utf8") > MAX_TEX_SOURCE_BYTES) {
    res.status(413).json({ error: "texSource is too large" })
    return
  }

  try {
    const pdf = await compileTex(texSource)
    res.setHeader("Content-Type", "application/pdf")
    res.status(200).send(pdf)
  } catch (err) {
    if (err instanceof LatexCompileError) {
      res.status(422).json({ error: "Compilation failed", log: err.log })
      return
    }
    res.status(500).json({ error: "Internal compile service error" })
  }
})

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" })
})

app.listen(PORT, () => {
  console.log(`compile-service listening on port ${PORT}`)
})
