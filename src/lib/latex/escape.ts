const LATEX_ESCAPE_MAP: Record<string, string> = {
  "\\": "\\textbackslash{}",
  "{": "\\{",
  "}": "\\}",
  $: "\\$",
  "&": "\\&",
  "%": "\\%",
  "#": "\\#",
  _: "\\_",
  "~": "\\textasciitilde{}",
  "^": "\\textasciicircum{}",
}

const LATEX_ESCAPE_PATTERN = /[\\{}$&%#_~^]/g

export function escapeLatex(str: string): string {
  if (str == null) return ""
  return String(str).replace(LATEX_ESCAPE_PATTERN, (char) => LATEX_ESCAPE_MAP[char])
}
