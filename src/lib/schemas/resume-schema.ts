import { z } from "zod"
import { ResumeDataSchema } from "@/types/resume"

export const resumeFormSchema = ResumeDataSchema.extend({
  title: z.string().min(1, "Resume title is required"),
  templateId: z.string().min(1),
})

export type ResumeFormValues = z.infer<typeof resumeFormSchema>
