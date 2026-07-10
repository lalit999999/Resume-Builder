export type TemplateCategory = "modern" | "classic" | "minimal" | "creative" | "ats-friendly"

export interface TemplateInfo {
  id: string
  name: string
  description: string
  category: TemplateCategory
  tags: string[]
  thumbnailColor: string
  popular?: boolean
}
