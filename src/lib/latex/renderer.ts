import nunjucks from "nunjucks"
import path from "node:path"
import type { ResumeData } from "@/types/resume"
import { escapeLatex } from "@/lib/latex/escape"

const TEMPLATES_ROOT = path.join(process.cwd(), "templates")

const env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(TEMPLATES_ROOT),
  {
    autoescape: false,
    tags: {
      variableStart: "<<",
      variableEnd: ">>",
      blockStart: "<%",
      blockEnd: "%>",
      commentStart: "<#",
      commentEnd: "#>",
    },
  }
)

env.addFilter("texescape", escapeLatex)

export function renderResume(templateId: string, data: ResumeData): string {
  return env.render(`${templateId}/template.tex.njk`, data)
}
