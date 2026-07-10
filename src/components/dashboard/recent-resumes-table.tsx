"use client"

import Link from "next/link"
import { toast } from "sonner"
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
import { ResumeStatusBadge } from "@/components/dashboard/resume-status-badge"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { FileStack } from "lucide-react"
import type { ResumeSummary } from "@/types/resume"

export function RecentResumesTable({ resumes }: { resumes: ResumeSummary[] }) {
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

  function handleDownload(title: string) {
    // TODO: wire to GET /api/resume/:id (fetch latest compiled PDF)
    toast.success(`Downloading "${title}"`)
  }

  function handleDelete(title: string) {
    // TODO: wire to DELETE /api/resume/:id
    toast.error(`"${title}" deleted`)
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
                    <DropdownMenuItem onSelect={() => handleDownload(resume.title)}>
                      <Download />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onSelect={() => handleDelete(resume.title)}
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
    </div>
  )
}
