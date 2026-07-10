import { TemplatesBrowser } from "./templates-browser"
import { getActiveTemplates } from "@/lib/resume-queries"
import type { TemplateCategory, TemplateInfo } from "@/types/template"

export default async function TemplatesPage() {
  const templates = await getActiveTemplates()

  const templateInfos: TemplateInfo[] = templates.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description ?? "",
    category: (t.category ?? "modern") as TemplateCategory,
    tags: t.tags,
    thumbnailColor: t.thumbnailColor ?? "oklch(0.6 0.05 150)",
    popular: t.popular,
  }))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Templates</h1>
        <p className="text-sm text-muted-foreground">
          Choose a starting point for your next resume.
        </p>
      </div>
      <TemplatesBrowser templates={templateInfos} />
    </div>
  )
}
