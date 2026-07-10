import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For trying things out and building your first resume.",
    features: ["1 active resume", "3 templates", "PDF export", "Community support"],
    cta: "Get started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$8",
    period: "/ month",
    description: "For active job seekers who need it all.",
    features: [
      "Unlimited resumes",
      "All templates",
      "Version history",
      "Priority compile queue",
      "Email support",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Teams",
    price: "$24",
    period: "/ month",
    description: "For career coaches and bootcamps.",
    features: ["Everything in Pro", "5 seats included", "Shared templates", "Admin dashboard"],
    cta: "Contact sales",
    featured: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-3 text-muted-foreground text-pretty">
          Start for free. Upgrade when you need more templates and history.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "flex flex-col",
              plan.featured && "border-primary shadow-md ring-1 ring-primary/20"
            )}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                {plan.featured && <Badge>Most popular</Badge>}
              </div>
              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-3xl font-semibold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <p className="pt-1 text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="flex flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full"
                variant={plan.featured ? "default" : "outline"}
              >
                <Link href="/sign-up">{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
