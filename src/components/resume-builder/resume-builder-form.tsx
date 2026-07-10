"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { PersonalInfoSection } from "@/components/resume-builder/personal-info-section"
import { EducationSection } from "@/components/resume-builder/education-section"
import { ExperienceSection } from "@/components/resume-builder/experience-section"
import { ProjectsSection } from "@/components/resume-builder/projects-section"
import { SkillsSection } from "@/components/resume-builder/skills-section"
import { AchievementsSection } from "@/components/resume-builder/achievements-section"
import { ResumePreview } from "@/components/resume-builder/resume-preview"
import { VersionHistoryDialog } from "@/components/resume-builder/version-history-dialog"
import { AutosaveIndicator } from "@/components/resume-builder/autosave-indicator"
import type { ResumeData } from "@/types/resume"

const FORM_SECTIONS = [
  { value: "personal", label: "Personal", component: PersonalInfoSection },
  { value: "education", label: "Education", component: EducationSection },
  { value: "experience", label: "Experience", component: ExperienceSection },
  { value: "projects", label: "Projects", component: ProjectsSection },
  { value: "skills", label: "Skills", component: SkillsSection },
  { value: "achievements", label: "Achievements", component: AchievementsSection },
] as const

export function ResumeBuilderForm({ resume }: { resume: ResumeData }) {
  const router = useRouter()
  const [isCompiling, setIsCompiling] = useState(false)
  const [autosaveStatus, setAutosaveStatus] = useState<"idle" | "saving" | "saved">("idle")
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit")

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      title: resume.title,
      templateId: resume.templateId,
      personalInfo: resume.personalInfo,
      education: resume.education,
      experience: resume.experience,
      projects: resume.projects,
      skills: resume.skills,
      achievements: resume.achievements,
    },
  })

  const watchedValues = form.watch()

  useEffect(() => {
    if (!form.formState.isDirty) return
    setAutosaveStatus("saving")
    const timeout = setTimeout(() => {
      // TODO: wire to PUT /api/resume/:id
      setAutosaveStatus("saved")
      setSavedAt(new Date())
    }, 800)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watchedValues)])

  async function handleCompile() {
    setIsCompiling(true)
    // TODO: wire to POST /api/resume/:id/compile
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsCompiling(false)
    toast.success("Resume compiled successfully", {
      description: "Your PDF is ready to download.",
    })
  }

  function handleSubmit(values: ResumeFormValues) {
    // TODO: wire to PUT /api/resume/:id then POST /api/resume/:id/compile
    void values
    void router
    handleCompile()
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
            <Tabs defaultValue="personal">
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
