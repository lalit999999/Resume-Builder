"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

const TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  resumes: "Resumes",
  templates: "Templates",
  profile: "Profile",
  settings: "Settings",
  help: "Help & Support",
}

export function DashboardHeader() {
  const pathname = usePathname()
  const segment = pathname?.split("/").filter(Boolean)[0] ?? "dashboard"
  const title = TITLES[segment] ?? "Dashboard"

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-foreground">
            {title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
