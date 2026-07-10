"use client"

import { toast } from "sonner"
import { Download, TriangleAlert } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function PrivacyTab() {
  function handleExport() {
    // TODO: wire to a data-export endpoint (returns a downloadable archive)
    toast.success("Preparing your data export", {
      description: "We'll email you a download link shortly.",
    })
  }

  function handleDeleteAllResumes() {
    // TODO: wire to a bulk DELETE across /api/resume/:id
    toast.error("All resumes deleted")
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Export your data</CardTitle>
          <CardDescription>
            Download a copy of your resumes, templates used, and account information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={handleExport}>
            <Download />
            Export data
          </Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <TriangleAlert className="size-4" />
            Delete all resumes
          </CardTitle>
          <CardDescription>
            Permanently remove every resume and its version history. Your account stays active.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete all resumes</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete all resumes?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently deletes every resume, draft, and generated PDF. This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAllResumes}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  Delete all resumes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  )
}
