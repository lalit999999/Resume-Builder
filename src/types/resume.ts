import { z } from "zod"

// ---- Sections, matching templates/nitp/template.tex.njk field-for-field ----

export const headerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  course: z.string().min(1, "Course is required"),
  department: z.string().min(1, "Department is required"),
  institute: z.string().min(1, "Institute is required"),
  location: z.string().min(1, "Location is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.email("Enter a valid email"),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.url("Enter a valid URL").optional().or(z.literal("")),
})

export const educationEntrySchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institute: z.string().min(1, "Institute is required"),
  cgpa: z.string().min(1, "CGPA is required"),
  year: z.string().min(1, "Year is required"),
})

export const experienceEntrySchema = z.object({
  company: z.string().min(1, "Company is required"),
  companyLink: z.url("Enter a valid URL").optional().or(z.literal("")),
  location: z.string().min(1, "Location is required"),
  title: z.string().min(1, "Title is required"),
  duration: z.string().min(1, "Duration is required"),
  bullets: z.array(z.string().min(1, "Bullet cannot be empty")),
})

export const projectEntrySchema = z.object({
  name: z.string().min(1, "Project name is required"),
  techStack: z.string().min(1, "Tech stack is required"),
  githubLink: z.url("Enter a valid URL").optional().or(z.literal("")),
  demoLink: z.url("Enter a valid URL").optional().or(z.literal("")),
  bullets: z.array(z.string().min(1, "Bullet cannot be empty")),
})

export const skillGroupSchema = z.object({
  category: z.string().min(1, "Category is required"),
  items: z.array(z.string().min(1)).min(1, "Add at least one skill"),
})

export const certificationEntrySchema = z.object({
  issuer: z.string().min(1, "Issuer is required"),
  title: z.string().min(1, "Title is required"),
  link: z.url("Enter a valid URL").optional().or(z.literal("")),
  date: z.string().min(1, "Date is required"),
})

export const positionEntrySchema = z.object({
  title: z.string().min(1, "Title is required"),
  titleLink: z.url("Enter a valid URL").optional().or(z.literal("")),
  organization: z.string().min(1, "Organization is required"),
  duration: z.string().min(1, "Duration is required"),
})

export const ResumeDataSchema = z.object({
  header: headerSchema,
  education: z.array(educationEntrySchema),
  experience: z.array(experienceEntrySchema),
  projects: z.array(projectEntrySchema),
  skills: z.array(skillGroupSchema),
  certifications: z.array(certificationEntrySchema),
  positions: z.array(positionEntrySchema),
})

export type Header = z.infer<typeof headerSchema>
export type EducationEntry = z.infer<typeof educationEntrySchema>
export type ExperienceEntry = z.infer<typeof experienceEntrySchema>
export type ProjectEntry = z.infer<typeof projectEntrySchema>
export type SkillGroup = z.infer<typeof skillGroupSchema>
export type CertificationEntry = z.infer<typeof certificationEntrySchema>
export type PositionEntry = z.infer<typeof positionEntrySchema>
export type ResumeData = z.infer<typeof ResumeDataSchema>

export const emptyResumeData: ResumeData = {
  header: {
    name: "",
    course: "",
    department: "",
    institute: "",
    location: "",
    phone: "",
    email: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certifications: [],
  positions: [],
}

// ---- Whole-resume record shape used by the frontend (not persisted directly) ----

export type ResumeStatus = "draft" | "queued" | "processing" | "compiled" | "failed"

export interface ResumeVersion {
  id: string
  version: number
  createdAt: string
  pdfUrl: string | null
  status: ResumeStatus
  fileSizeKb?: number
}

export interface ResumeRecord {
  id: string
  title: string
  templateId: string
  status: ResumeStatus
  data: ResumeData
  createdAt: string
  updatedAt: string
  downloadCount: number
  versions: ResumeVersion[]
}

export interface ResumeSummary {
  id: string
  title: string
  templateId: string
  templateName: string
  status: ResumeStatus
  updatedAt: string
  downloadCount: number
  thumbnailUrl?: string
  pdfUrl?: string
}
