import Link from "next/link"
import { FileStack, Download, LayoutTemplate, Clock3, Plus } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/dashboard/stat-card"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { RecentResumesTable } from "@/components/dashboard/recent-resumes-table"
import { requireUser } from "@/lib/auth"
import { getResumeHistoryForUser } from "@/lib/resume-queries"
import { computeActivity, computeDashboardStats, toResumeSummary } from "@/lib/resume-summary"

export default async function DashboardPage() {
  const user = await requireUser()
  const history = await getResumeHistoryForUser(user.id)

  const stats = computeDashboardStats(history)
  const activity = computeActivity(history)
  const recentResumes = history.slice(0, 5).map(toResumeSummary)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back — here&apos;s what&apos;s happening with your resumes.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/templates">
              <LayoutTemplate />
              Browse Templates
            </Link>
          </Button>
          <Button asChild>
            <Link href="/resumes/new/edit">
              <Plus />
              Create New Resume
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total resumes"
          value={String(stats.totalResumes)}
          icon={FileStack}
        />
        <StatCard
          label="Total downloads"
          value={String(stats.totalDownloads)}
          icon={Download}
        />
        <StatCard
          label="Most-used template"
          value={stats.mostUsedTemplate}
          icon={LayoutTemplate}
        />
        <StatCard
          label="Last edited"
          value={format(new Date(stats.lastEditedAt), "MMM d, yyyy")}
          icon={Clock3}
        />
      </div>

      <ActivityChart data={activity} />

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Recent resumes</h2>
        <RecentResumesTable resumes={recentResumes} />
      </div>
    </div>
  )
}
