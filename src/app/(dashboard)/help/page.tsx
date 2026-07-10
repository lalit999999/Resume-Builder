import { FaqList } from "@/components/help/faq-list"
import { ContactSupportCard } from "@/components/help/contact-support-card"
import { mockFaqs } from "@/lib/mock-faqs"

export default function HelpPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Help & Support</h1>
        <p className="text-sm text-muted-foreground">
          Answers to common questions, or reach out to our team directly.
        </p>
      </div>

      <FaqList faqs={mockFaqs} />
      <ContactSupportCard />
    </div>
  )
}
