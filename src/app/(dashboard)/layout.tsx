import type { Metadata } from "next"
import { auth } from "@clerk/nextjs/server"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { FileText } from "lucide-react"
import { DashboardNavLinks } from "@/components/dashboard/dashboard-nav-links"
import { DashboardUserMenu } from "@/components/dashboard/dashboard-user-menu"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export const metadata: Metadata = {
  title: {
    template: "%s | Resume Builder",
    default: "Dashboard | Resume Builder",
  },
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await auth.protect()

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <a href="/dashboard">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <FileText className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        Resume Builder
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        Workspace
                      </span>
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <DashboardNavLinks />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <DashboardUserMenu />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DashboardHeader />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
