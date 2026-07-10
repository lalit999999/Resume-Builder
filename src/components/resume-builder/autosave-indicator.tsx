"use client"

import { format } from "date-fns"
import { Check, Loader2 } from "lucide-react"

interface AutosaveIndicatorProps {
  status: "idle" | "saving" | "saved"
  savedAt: Date | null
}

export function AutosaveIndicator({ status, savedAt }: AutosaveIndicatorProps) {
  if (status === "saving") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Loader2 className="size-3 animate-spin" />
        Saving...
      </span>
    )
  }

  if (status === "saved" && savedAt) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Check className="size-3 text-primary" />
        Draft saved at {format(savedAt, "h:mm a")}
      </span>
    )
  }

  return null
}
