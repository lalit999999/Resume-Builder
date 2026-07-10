"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { TemplateInfo } from "@/types/template"

interface TemplatePreviewDialogProps {
  template: TemplateInfo | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TemplatePreviewDialog({
  template,
  open,
  onOpenChange,
}: TemplatePreviewDialogProps) {
  const router = useRouter()

  if (!template) return null

  function handleUseTemplate() {
    // TODO: wire to POST /api/resume with { templateId: template.id }
    toast.success(`Starting a new resume with ${template!.name}`)
    onOpenChange(false)
    router.push(`/resumes/new/edit?template=${template!.id}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{template.name}</DialogTitle>
          <DialogDescription>{template.description}</DialogDescription>
        </DialogHeader>

        <div
          className="flex items-center justify-center rounded-lg border p-8"
          style={{
            background: `linear-gradient(160deg, ${template.thumbnailColor} 0%, transparent 70%)`,
          }}
        >
          <div className="flex aspect-[3/4] w-full max-w-xs flex-col gap-3 rounded-md border bg-background p-5 shadow-sm">
            <FileText className="size-5 text-muted-foreground" />
            <div className="h-3 w-2/3 rounded bg-foreground/70" />
            <div className="h-2 w-1/2 rounded bg-muted-foreground/40" />
            <div className="mt-3 h-2 w-full rounded bg-muted-foreground/20" />
            <div className="h-2 w-full rounded bg-muted-foreground/20" />
            <div className="h-2 w-5/6 rounded bg-muted-foreground/20" />
            <div className="mt-3 h-2 w-1/3 rounded bg-foreground/50" />
            <div className="h-2 w-full rounded bg-muted-foreground/20" />
            <div className="h-2 w-4/5 rounded bg-muted-foreground/20" />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {template.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <DialogFooter>
          <Button onClick={handleUseTemplate}>Use this template</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
