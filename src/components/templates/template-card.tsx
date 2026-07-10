import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { FileText, Sparkles } from "lucide-react"
import type { TemplateInfo } from "@/types/template"

interface TemplateCardProps {
  template: TemplateInfo
  onSelect: (template: TemplateInfo) => void
}

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <Card className="overflow-hidden py-0 gap-0">
      <button
        type="button"
        onClick={() => onSelect(template)}
        className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Preview ${template.name} template`}
      >
        <div
          className="relative flex aspect-[3/4] items-center justify-center"
          style={{
            background: `linear-gradient(160deg, ${template.thumbnailColor} 0%, transparent 70%)`,
          }}
        >
          <div className="flex h-[85%] w-[70%] flex-col gap-2 rounded-md border bg-background p-3 shadow-sm transition-transform group-hover:scale-[1.02]">
            <FileText className="size-4 text-muted-foreground" />
            <div className="h-2 w-2/3 rounded bg-foreground/70" />
            <div className="h-1.5 w-1/2 rounded bg-muted-foreground/40" />
            <div className="mt-2 h-1.5 w-full rounded bg-muted-foreground/20" />
            <div className="h-1.5 w-full rounded bg-muted-foreground/20" />
            <div className="h-1.5 w-3/4 rounded bg-muted-foreground/20" />
          </div>
          {template.popular && (
            <Badge className="absolute right-2 top-2 gap-1">
              <Sparkles className="size-3" />
              Popular
            </Badge>
          )}
        </div>
      </button>
      <CardContent className="pt-4">
        <p className="font-medium">{template.name}</p>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {template.description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-1.5 pb-4">
        {template.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  )
}
