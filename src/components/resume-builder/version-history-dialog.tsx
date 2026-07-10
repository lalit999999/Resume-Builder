"use client"

import { format } from "date-fns"
import { toast } from "sonner"
import { Download, History } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ResumeVersion } from "@/types/resume"

export function VersionHistoryDialog({ versions }: { versions: ResumeVersion[] }) {
  function handleDownload(version: number) {
    // TODO: wire to stored pdfUrl (Cloudinary) for this version
    toast.success(`Downloading version ${version}`)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <History />
          Version history
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Version history</DialogTitle>
          <DialogDescription>
            Every compiled PDF is saved automatically. Download any past version.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col divide-y">
          {versions.length === 0 && (
            <p className="py-4 text-sm text-muted-foreground">
              No compiled versions yet.
            </p>
          )}
          {versions.map((version) => (
            <div key={version.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">v{version.version}</Badge>
                <div className="text-sm">
                  <p>{format(new Date(version.createdAt), "MMM d, yyyy 'at' h:mm a")}</p>
                  <p className="text-xs text-muted-foreground">{version.fileSizeKb} KB</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDownload(version.version)}
                aria-label={`Download version ${version.version}`}
              >
                <Download className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
