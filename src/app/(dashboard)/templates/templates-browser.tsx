"use client"

import { useMemo, useState } from "react"
import { Search, LayoutTemplate } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { TemplateCard } from "@/components/templates/template-card"
import { TemplatePreviewDialog } from "@/components/templates/template-preview-dialog"
import type { TemplateCategory, TemplateInfo } from "@/types/template"

const CATEGORIES: { value: TemplateCategory | "all"; label: string }[] = [
  { value: "all", label: "All categories" },
  { value: "modern", label: "Modern" },
  { value: "classic", label: "Classic" },
  { value: "minimal", label: "Minimal" },
  { value: "creative", label: "Creative" },
  { value: "ats-friendly", label: "ATS-Friendly" },
]

export function TemplatesBrowser({ templates }: { templates: TemplateInfo[] }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<TemplateCategory | "all">("all")
  const [selected, setSelected] = useState<TemplateInfo | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = useMemo(() => {
    return templates.filter((template) => {
      const matchesQuery =
        query.trim() === "" ||
        template.name.toLowerCase().includes(query.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      const matchesCategory = category === "all" || template.category === category
      return matchesQuery && matchesCategory
    })
  }, [templates, query, category])

  function handleSelect(template: TemplateInfo) {
    setSelected(template)
    setDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates by name or tag..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search templates"
          />
        </div>
        <Select
          value={category}
          onValueChange={(value) => setCategory(value as TemplateCategory | "all")}
        >
          <SelectTrigger className="w-full sm:w-56" aria-label="Filter by category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <Empty>
          <EmptyMedia>
            <LayoutTemplate className="size-6" />
          </EmptyMedia>
          <EmptyTitle>No templates found</EmptyTitle>
          <EmptyDescription>
            Try a different search term or category filter.
          </EmptyDescription>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((template) => (
            <TemplateCard key={template.id} template={template} onSelect={handleSelect} />
          ))}
        </div>
      )}

      <TemplatePreviewDialog
        template={selected}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}
