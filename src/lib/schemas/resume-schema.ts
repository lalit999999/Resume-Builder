import { z } from "zod"

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Enter a valid email"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  summary: z.string().max(600, "Keep your summary under 600 characters").optional(),
})

export const educationEntrySchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  gpa: z.string().optional(),
  description: z.string().optional(),
})

export const experienceEntrySchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string(),
  current: z.boolean(),
  bullets: z.array(z.string().min(1, "Bullet cannot be empty")).min(1, "Add at least one bullet"),
})

export const projectEntrySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.array(z.string()),
  link: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export const skillGroupSchema = z.object({
  id: z.string(),
  category: z.string().min(1, "Category is required"),
  items: z.array(z.string()).min(1, "Add at least one skill"),
})

export const achievementEntrySchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().optional(),
})

export const resumeFormSchema = z.object({
  title: z.string().min(1, "Resume title is required"),
  templateId: z.string().min(1),
  personalInfo: personalInfoSchema,
  education: z.array(educationEntrySchema),
  experience: z.array(experienceEntrySchema),
  projects: z.array(projectEntrySchema),
  skills: z.array(skillGroupSchema),
  achievements: z.array(achievementEntrySchema),
})

export type ResumeFormValues = z.infer<typeof resumeFormSchema>
