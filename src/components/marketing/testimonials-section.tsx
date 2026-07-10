import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const TESTIMONIALS = [
  {
    quote:
      "The live preview alone saved me hours. I landed three interviews the same week I switched templates.",
    name: "Rohan Verma",
    role: "Data Analyst",
  },
  {
    quote:
      "It genuinely looks like a resume a LaTeX nerd would make — except I never touched a .tex file.",
    name: "Priya Nair",
    role: "Software Engineer",
  },
  {
    quote:
      "Version history saved me when I accidentally overwrote my best draft. Restored it in seconds.",
    name: "Daniel Osei",
    role: "Product Manager",
  },
]

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()
}

export function TestimonialsSection() {
  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-4 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="border-border/60">
              <CardContent className="flex h-full flex-col gap-4 pt-6">
                <p className="flex-1 text-sm text-muted-foreground text-pretty">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback>{initials(t.name)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{t.name}</p>
                    <p className="text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
