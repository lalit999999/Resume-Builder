"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Download, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ResumeStatusBadge } from "@/components/dashboard/resume-status-badge"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { FileStack } from "lucide-react"
import type { ResumeSummary } from "@/types/resume"
import { deleteResume } from "@/lib/api-client"
import { queryKeys } from "@/lib/query-keys"

export function RecentResumesTable({ resumes }: { resumes: ResumeSummary[] }) {
  const queryClient = useQueryClient()
  const [pendingDelete, setPendingDelete] = useState<ResumeSummary | null>(null)

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteResume(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.resumeHistory })
      queryClient.invalidateQueries({ queryKey: queryKeys.resumes })
      toast.success("Resume deleted")
    },
    onError: () => {
      toast.error("Failed to delete resume")
    },
    onSettled: () => setPendingDelete(null),
  })

  function handleDownload(resume: ResumeSummary) {
    if (!resume.pdfUrl) {
      toast.error(`"${resume.title}" hasn't been compiled yet`)
      return
    }
    window.open(resume.pdfUrl, "_blank", "noopener,noreferrer")
  }

  if (resumes.length === 0) {
    return (
      <Empty>
        <EmptyMedia>
          <FileStack className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No resumes yet</EmptyTitle>
        <EmptyDescription>
          Create your first resume to see it listed here.
        </EmptyDescription>
      </Empty>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden sm:table-cell">Template</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Last updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resumes.map((resume) => (
            <TableRow key={resume.id}>
              <TableCell className="font-medium">{resume.title}</TableCell>
              <TableCell className="hidden text-muted-foreground sm:table-cell">
                {resume.templateName}
              </TableCell>
              <TableCell>
                <ResumeStatusBadge status={resume.status} />
              </TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {format(new Date(resume.updatedAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Actions for ${resume.title}`}
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/resumes/${resume.id}/edit`}>
                        <Pencil />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleDownload(resume)}>
                      <Download />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onSelect={() => setPendingDelete(resume)}
                    >
                      <Trash2 />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &quot;{pendingDelete?.title}&quot;?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the resume and all of its versions from your account. This
              action cannot be undone from the UI.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleteMutation.isPending}
              onClick={() => pendingDelete && deleteMutation.mutate(pendingDelete.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
