import { ResumeBuilderForm } from "@/components/resume-builder/resume-builder-form"
import { mockResumeData } from "@/lib/mock-data"

export default async function ResumeEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // TODO: replace with GET /api/resume/:id — falls back to a blank mock draft for new resumes
  const resume = { ...mockResumeData, id }

  return <ResumeBuilderForm resume={resume} />
}
