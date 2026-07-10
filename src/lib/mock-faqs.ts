export interface Faq {
  id: string
  question: string
  answer: string
  category: string
}

export const mockFaqs: Faq[] = [
  {
    id: "faq_1",
    category: "Getting started",
    question: "How do I create my first resume?",
    answer:
      "From the Dashboard, click \"Create New Resume\", pick a template, and fill in the guided form. Your PDF compiles automatically as you go.",
  },
  {
    id: "faq_2",
    category: "Getting started",
    question: "Can I import an existing resume?",
    answer:
      "Not yet — for now, resumes are built from scratch using the form. Import from LinkedIn/PDF is on our roadmap.",
  },
  {
    id: "faq_3",
    category: "Templates",
    question: "What does \"ATS-friendly\" mean?",
    answer:
      "These templates use simple, single-column layouts and standard fonts that parse cleanly in applicant tracking systems used by most recruiters.",
  },
  {
    id: "faq_4",
    category: "Templates",
    question: "Can I switch templates after starting a resume?",
    answer:
      "Yes. Open your resume in the builder and choose a new template from the template picker — your content carries over automatically.",
  },
  {
    id: "faq_5",
    category: "PDFs & compiling",
    question: "Why did my resume fail to compile?",
    answer:
      "Compile failures are usually caused by special characters in text fields. Check the error details in the compile toast, or contact support if it persists.",
  },
  {
    id: "faq_6",
    category: "PDFs & compiling",
    question: "How long is version history kept?",
    answer:
      "All compiled versions are kept indefinitely on paid plans, and the last 3 versions on the free plan.",
  },
  {
    id: "faq_7",
    category: "Billing",
    question: "How do I cancel my subscription?",
    answer:
      "Go to Settings → Account and click \"Manage subscription\". Your plan stays active until the end of the billing period.",
  },
  {
    id: "faq_8",
    category: "Privacy",
    question: "Is my resume data private?",
    answer:
      "Yes. Resumes are only visible to you unless you explicitly share a download link. All storage is encrypted at rest.",
  },
]
