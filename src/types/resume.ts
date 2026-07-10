export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  summary?: string
}

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  gpa?: string
  description?: string
}

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  bullets: string[]
}

export interface ProjectEntry {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  startDate?: string
  endDate?: string
}

export interface SkillGroup {
  id: string
  category: string
  items: string[]
}

export interface AchievementEntry {
  id: string
  title: string
  description?: string
  date?: string
}

export type ResumeStatus = "draft" | "compiled" | "failed"

export interface ResumeVersion {
  id: string
  version: number
  createdAt: string
  pdfUrl: string
  fileSizeKb: number
}

export interface ResumeData {
  id: string
  title: string
  templateId: string
  status: ResumeStatus
  personalInfo: PersonalInfo
  education: EducationEntry[]
  experience: ExperienceEntry[]
  projects: ProjectEntry[]
  skills: SkillGroup[]
  achievements: AchievementEntry[]
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
}
