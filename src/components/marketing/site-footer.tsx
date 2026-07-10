import Link from "next/link"
import { FileText, Globe, Mail, MessageCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Templates", href: "#templates" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-semibold">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FileText className="size-4" />
              </div>
              <span>Resume Builder</span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              LaTeX-quality resumes without touching a single line of LaTeX.
            </p>
            <div className="flex items-center gap-3 pt-1 text-muted-foreground">
              <Link href="#" aria-label="Website" className="hover:text-foreground">
                <Globe className="size-4" />
              </Link>
              <Link href="#" aria-label="Community" className="hover:text-foreground">
                <MessageCircle className="size-4" />
              </Link>
              <Link href="#" aria-label="Email" className="hover:text-foreground">
                <Mail className="size-4" />
              </Link>
            </div>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-medium">{group.title}</h3>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
