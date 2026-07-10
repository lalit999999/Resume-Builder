import { Badge } from "@/components/ui/badge"
import type { ResumeStatus } from "@/types/resume"

const STATUS_MAP: Record<ResumeStatus, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  compiled: { label: "Compiled", variant: "default" },
  draft: { label: "Draft", variant: "secondary" },
  queued: { label: "Queued", variant: "secondary" },
  processing: { label: "Compiling…", variant: "secondary" },
  failed: { label: "Failed", variant: "destructive" },
}

export function ResumeStatusBadge({ status }: { status: ResumeStatus }) {
  const { label, variant } = STATUS_MAP[status]
  return <Badge variant={variant}>{label}</Badge>
}
