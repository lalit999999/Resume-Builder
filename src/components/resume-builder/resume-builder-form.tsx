"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { resumeFormSchema, type ResumeFormValues } from "@/lib/schemas/resume-schema"
import { HeaderSection } from "@/components/resume-builder/header-section"
import { EducationSection } from "@/components/resume-builder/education-section"
import { ExperienceSection } from "@/components/resume-builder/experience-section"
import { ProjectsSection } from "@/components/resume-builder/projects-section"
import { SkillsSection } from "@/components/resume-builder/skills-section"
import { CertificationsSection } from "@/components/resume-builder/certifications-section"
import { PositionsSection } from "@/components/resume-builder/positions-section"
import { ResumePreview } from "@/components/resume-builder/resume-preview"
import { VersionHistoryDialog } from "@/components/resume-builder/version-history-dialog"
import { AutosaveIndicator } from "@/components/resume-builder/autosave-indicator"
import type { ResumeData, ResumeRecord } from "@/types/resume"
import {
  compileResume,
  createResume,
  getCompileStatus,
  updateResume,
} from "@/lib/api-client"
import { queryKeys } from "@/lib/query-keys"

const FORM_SECTIONS = [
  { value: "header", label: "Header", component: HeaderSection },
  { value: "education", label: "Education", component: EducationSection },
  { value: "experience", label: "Experience", component: ExperienceSection },
  { value: "projects", label: "Projects", component: ProjectsSection },
  { value: "skills", label: "Skills", component: SkillsSection },
  { value: "certifications", label: "Certifications", component: CertificationsSection },
  { value: "positions", label: "Positions", component: PositionsSection },
] as const

function toResumeData(values: ResumeFormValues): ResumeData {
  return {
    header: values.header,
    education: values.education,
    experience: values.experience,
    projects: values.projects,
    skills: values.skills,
    certifications: values.certifications,
    positions: values.positions,
  }
}

const POLL_INTERVAL_MS = 1500
const POLL_TIMEOUT_MS = 90_000

async function pollCompileStatus(resumeId: string, jobId: string) {
  const deadline = Date.now() + POLL_TIMEOUT_MS
  while (Date.now() < deadline) {
    const status = await getCompileStatus(resumeId, jobId)
    if (status.status === "completed" || status.status === "failed") return status
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS))
  }
  throw new Error("Compile timed out")
}

export function ResumeBuilderForm({ resume }: { resume: ResumeRecord }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [resumeId, setResumeId] = useState(resume.id)
  const [isCompiling, setIsCompiling] = useState(false)
  const [autosaveStatus, setAutosaveStatus] = useState<"idle" | "saving" | "saved">("idle")
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit")
  const resumeIdRef = useRef(resumeId)
  resumeIdRef.current = resumeId

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      title: resume.title,
      templateId: resume.templateId,
      header: resume.data.header,
      education: resume.data.education,
      experience: resume.data.experience,
      projects: resume.data.projects,
      skills: resume.data.skills,
      certifications: resume.data.certifications,
      positions: resume.data.positions,
    },
  })

  const watchedValues = form.watch()

  useEffect(() => {
    if (!form.formState.isDirty) return
    if (resumeIdRef.current === "new") return // nothing to autosave until the resume exists

    setAutosaveStatus("saving")
    const timeout = setTimeout(async () => {
      try {
        const values = form.getValues()
        await updateResume(resumeIdRef.current, {
          title: values.title,
          templateId: values.templateId,
          data: toResumeData(values),
        })
        setAutosaveStatus("saved")
        setSavedAt(new Date())
        queryClient.invalidateQueries({ queryKey: queryKeys.resumeHistory })
        queryClient.invalidateQueries({ queryKey: queryKeys.resumes })
      } catch {
        setAutosaveStatus("idle")
        toast.error("Autosave failed")
      }
    }, 800)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watchedValues)])

  async function handleSubmit(values: ResumeFormValues) {
    setIsCompiling(true)
    try {
      const data = toResumeData(values)
      let id = resumeIdRef.current

      if (id === "new") {
        const created = await createResume({ title: values.title, templateId: values.templateId, data })
        id = created.id
        setResumeId(id)
        resumeIdRef.current = id
        router.replace(`/resumes/${id}/edit`)
      } else {
        await updateResume(id, { title: values.title, templateId: values.templateId, data })
      }

      const { jobId } = await compileResume(id)
      const result = await pollCompileStatus(id, jobId)

      queryClient.invalidateQueries({ queryKey: queryKeys.resumeHistory })
      queryClient.invalidateQueries({ queryKey: queryKeys.resumes })

      if (result.status === "completed") {
        toast.success("Resume compiled successfully", {
          description: "Your PDF is ready to download.",
        })
      } else {
        toast.error("Resume failed to compile", {
          description: result.errorLog ?? "Check your entries for issues and try again.",
        })
      }
    } catch {
      toast.error("Something went wrong generating your resume")
    } finally {
      setIsCompiling(false)
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <Input
              {...form.register("title")}
              aria-label="Resume title"
              className="h-9 max-w-sm border-none px-0 text-xl font-semibold shadow-none focus-visible:ring-0"
            />
            <AutosaveIndicator status={autosaveStatus} savedAt={savedAt} />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <VersionHistoryDialog versions={resume.versions} />
            <Button type="submit" disabled={isCompiling}>
              {isCompiling ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {isCompiling ? "Generating..." : "Generate Resume"}
            </Button>
          </div>
        </div>

        <ButtonGroup className="w-fit lg:hidden">
          <Button
            type="button"
            variant={mobileView === "edit" ? "default" : "outline"}
            size="sm"
            onClick={() => setMobileView("edit")}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant={mobileView === "preview" ? "default" : "outline"}
            size="sm"
            onClick={() => setMobileView("preview")}
          >
            Preview
          </Button>
        </ButtonGroup>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={cn(mobileView === "preview" && "hidden", "lg:block")}>
            <Tabs defaultValue="header">
              <TabsList className="w-full flex-wrap">
                {FORM_SECTIONS.map((section) => (
                  <TabsTrigger key={section.value} value={section.value}>
                    {section.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {FORM_SECTIONS.map((section) => (
                <TabsContent key={section.value} value={section.value} className="@container/field-group pt-4">
                  <section.component />
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className={cn(mobileView === "edit" && "hidden", "lg:block lg:sticky lg:top-20 lg:self-start")}>
            <ResumePreview />
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
