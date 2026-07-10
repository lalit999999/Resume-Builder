import {
  ShieldCheck,
  FileCode2,
  Eye,
  History,
  LayoutTemplate,
  Cloud,
} from "lucide-react"
import { FeatureCard } from "@/components/marketing/feature-card"

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "ATS-friendly templates",
    description:
      "Every template is tested against major applicant tracking systems so your resume gets parsed correctly.",
  },
  {
    icon: FileCode2,
    title: "LaTeX-quality PDFs",
    description:
      "Resumes are typeset with XeLaTeX under the hood — the same engine used for academic papers and books.",
  },
  {
    icon: Eye,
    title: "Live preview",
    description:
      "See exactly how your resume will look as you type, no more surprises after export.",
  },
  {
    icon: History,
    title: "Version history",
    description:
      "Every compile is saved. Roll back to a previous version or compare edits in one click.",
  },
  {
    icon: LayoutTemplate,
    title: "Multiple templates",
    description:
      "Modern, classic, minimal and creative layouts for every industry and career stage.",
  },
  {
    icon: Cloud,
    title: "Secure cloud storage",
    description:
      "Your resumes and generated PDFs are encrypted and backed up automatically.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything you need to ship a great resume
        </h2>
        <p className="mt-3 text-muted-foreground text-pretty">
          From first draft to final PDF, every step is designed to keep you
          focused on your story — not your formatting.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  )
}
