import { Skeleton } from "@/components/ui/skeleton"

export default function ResumeEditLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-9 w-40" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-[32rem] w-full" />
        <Skeleton className="h-[32rem] w-full" />
      </div>
    </div>
  )
}
