"use client"

import { useMemo, useState } from "react"
import { Search, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import type { Faq } from "@/lib/mock-faqs"

export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    if (query.trim() === "") return faqs
    const q = query.toLowerCase()
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q)
    )
  }, [faqs, query])

  const grouped = useMemo(() => {
    const map = new Map<string, Faq[]>()
    for (const faq of filtered) {
      const list = map.get(faq.category) ?? []
      list.push(faq)
      map.set(faq.category, list)
    }
    return Array.from(map.entries())
  }, [filtered])

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search help articles..."
          className="pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search FAQs"
        />
      </div>

      {grouped.length === 0 ? (
        <Empty>
          <EmptyMedia>
            <HelpCircle className="size-6" />
          </EmptyMedia>
          <EmptyTitle>No results</EmptyTitle>
          <EmptyDescription>Try a different search term, or contact support below.</EmptyDescription>
        </Empty>
      ) : (
        <div className="flex flex-col gap-6">
          {grouped.map(([category, items]) => (
            <div key={category}>
              <h2 className="mb-2 text-sm font-medium text-muted-foreground">{category}</h2>
              <Accordion type="single" collapsible className="rounded-lg border px-4">
                {items.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
