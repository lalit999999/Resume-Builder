import Link from "next/link"
import { ArrowRight, FileCheck2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Badge variant="secondary" className="w-fit">
            Now with instant version history
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Resumes that compile like{" "}
            <span className="text-primary">LaTeX</span>, built like a form.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground text-pretty">
            Fill out a simple form, pick a template, and get a
            typeset-quality PDF in seconds. No LaTeX knowledge required —
            just clean, ATS-friendly resumes every time.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/sign-up">
                Build Your Resume
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#templates">Browse templates</Link>
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileCheck2 className="size-4" />
            <span>No credit card required · Export unlimited PDFs</span>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-xl border bg-card p-3 shadow-lg sm:p-4">
            <div className="rounded-lg border bg-muted/40 p-6 sm:p-8">
              <div className="mx-auto max-w-sm space-y-3 rounded-md border bg-background p-6 shadow-sm">
                <div className="h-3 w-2/3 rounded bg-foreground/80" />
                <div className="h-2 w-1/2 rounded bg-muted-foreground/40" />
                <div className="mt-4 h-2 w-full rounded bg-muted-foreground/20" />
                <div className="h-2 w-full rounded bg-muted-foreground/20" />
                <div className="h-2 w-3/4 rounded bg-muted-foreground/20" />
                <div className="mt-4 h-2 w-1/3 rounded bg-foreground/60" />
                <div className="h-2 w-full rounded bg-muted-foreground/20" />
                <div className="h-2 w-5/6 rounded bg-muted-foreground/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
