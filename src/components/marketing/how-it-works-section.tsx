const STEPS = [
  {
    number: "01",
    title: "Fill out your details",
    description: "Add your experience, education and skills using a guided, structured form.",
  },
  {
    number: "02",
    title: "Pick a template",
    description: "Choose from modern, classic, minimal or creative LaTeX-backed layouts.",
  },
  {
    number: "03",
    title: "Compile to PDF",
    description: "We render your data into LaTeX and compile it into a polished, typeset PDF.",
  },
  {
    number: "04",
    title: "Download & track",
    description: "Download instantly and revisit past versions any time from your history.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            Four steps between a blank page and a finished resume.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.number} className="flex flex-col gap-2">
              <span className="text-sm font-mono font-medium text-primary">
                {step.number}
              </span>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
