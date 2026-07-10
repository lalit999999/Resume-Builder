import { TemplatesBrowser } from "./templates-browser"
import { mockTemplates } from "@/lib/mock-data"

export default function TemplatesPage() {
  // TODO: replace with GET /api/templates (or equivalent listing endpoint)
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Templates</h1>
        <p className="text-sm text-muted-foreground">
          Choose a starting point for your next resume.
        </p>
      </div>
      <TemplatesBrowser templates={mockTemplates} />
    </div>
  )
}
