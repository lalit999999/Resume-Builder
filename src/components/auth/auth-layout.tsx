import Link from "next/link"
import { FileText, Sparkles, ShieldCheck, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const FEATURES = [
  { icon: Sparkles, text: "ATS-friendly templates crafted by hiring pros" },
  { icon: Zap, text: "Live LaTeX rendering with instant PDF export" },
  { icon: ShieldCheck, text: "Version history so you never lose an edit" },
]

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-muted p-10 lg:flex">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent"
        />
        <Link href="/" className="relative z-10 flex items-center gap-2 font-semibold">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="size-4" aria-hidden />
          </div>
          <span>Resume Builder</span>
        </Link>

        <div className="relative z-10 max-w-md space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Build ATS-friendly resumes, powered by LaTeX.
          </h2>
          <ul className="space-y-4">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-3.5" aria-hidden />
                </span>
                <span className="text-sm text-muted-foreground">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 p-6 sm:p-10">
        <Link href="/" className="flex items-center gap-2 font-semibold lg:hidden">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="size-4" aria-hidden />
          </div>
          <span>Resume Builder</span>
        </Link>

        <Card className="w-full max-w-sm border p-6 shadow-sm sm:p-8">
          <CardContent className="p-0">{children}</CardContent>
        </Card>
      </div>
    </div>
  )
}
