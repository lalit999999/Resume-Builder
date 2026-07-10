"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { FileStack } from "lucide-react"
import { RecentResumesTable } from "@/components/dashboard/recent-resumes-table"
import { getResumeHistory } from "@/lib/api-client"
import { queryKeys } from "@/lib/query-keys"
import { toResumeSummary } from "@/lib/resume-summary"

export default function ResumesPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.resumeHistory,
    queryFn: getResumeHistory,
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Resumes</h1>
          <p className="text-sm text-muted-foreground">
            All of your resumes in one place — edit, download, or delete.
          </p>
        </div>
        <Button asChild>
          <Link href="/resumes/new/edit">
            <Plus />
            Create New Resume
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : isError ? (
        <Empty>
          <EmptyMedia>
            <FileStack className="size-6" />
          </EmptyMedia>
          <EmptyTitle>Couldn&apos;t load your resumes</EmptyTitle>
          <EmptyDescription>Something went wrong fetching your resumes.</EmptyDescription>
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw />
            Retry
          </Button>
        </Empty>
      ) : (
        <RecentResumesTable resumes={(data ?? []).map(toResumeSummary)} />
      )}
    </div>
  )
}
