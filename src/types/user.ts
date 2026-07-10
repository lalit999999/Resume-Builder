export interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  bio?: string
  avatarUrl?: string
  createdAt: string
}

export interface DashboardStats {
  totalResumes: number
  totalDownloads: number
  mostUsedTemplate: string
  lastEditedAt: string
}

export interface ActivityPoint {
  date: string
  resumesCreated: number
  downloads: number
}
