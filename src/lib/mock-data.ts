import type { ResumeData, ResumeSummary } from "@/types/resume"
import type { TemplateInfo } from "@/types/template"
import type { ActivityPoint, DashboardStats, UserProfile } from "@/types/user"

export const mockUser: UserProfile = {
  id: "user_1",
  name: "Aditi Sharma",
  email: "aditi.sharma@example.com",
  phone: "+91 98765 43210",
  bio: "Product-minded frontend engineer. Building clean, accessible interfaces.",
  avatarUrl: undefined,
  createdAt: "2025-01-14T10:00:00.000Z",
}

export const mockTemplates: TemplateInfo[] = [
  {
    id: "tpl_atlas",
    name: "Atlas",
    description: "Clean two-column layout optimized for tech roles.",
    category: "modern",
    tags: ["Modern", "ATS-Friendly"],
    thumbnailColor: "oklch(0.7 0.12 250)",
    popular: true,
  },
  {
    id: "tpl_summit",
    name: "Summit",
    description: "Traditional single-column format trusted by recruiters.",
    category: "classic",
    tags: ["Classic", "ATS-Friendly"],
    thumbnailColor: "oklch(0.6 0.05 150)",
  },
  {
    id: "tpl_lumen",
    name: "Lumen",
    description: "Minimal whitespace-forward design for senior roles.",
    category: "minimal",
    tags: ["Minimal"],
    thumbnailColor: "oklch(0.85 0.02 90)",
  },
  {
    id: "tpl_forge",
    name: "Forge",
    description: "Bold section headers, great for engineering leads.",
    category: "modern",
    tags: ["Modern", "Bold"],
    thumbnailColor: "oklch(0.55 0.18 30)",
    popular: true,
  },
  {
    id: "tpl_canvas",
    name: "Canvas",
    description: "Accent sidebar with skill bars for design/creative roles.",
    category: "creative",
    tags: ["Creative"],
    thumbnailColor: "oklch(0.65 0.2 340)",
  },
  {
    id: "tpl_index",
    name: "Index",
    description: "Dense, single-page format for early-career applicants.",
    category: "ats-friendly",
    tags: ["ATS-Friendly", "Compact"],
    thumbnailColor: "oklch(0.5 0.03 250)",
  },
]

export const mockResumeSummaries: ResumeSummary[] = [
  {
    id: "res_1",
    title: "Frontend Engineer — Google",
    templateId: "tpl_atlas",
    templateName: "Atlas",
    status: "compiled",
    updatedAt: "2026-07-08T09:24:00.000Z",
    downloadCount: 5,
  },
  {
    id: "res_2",
    title: "Product Designer — Figma",
    templateId: "tpl_canvas",
    templateName: "Canvas",
    status: "draft",
    updatedAt: "2026-07-06T14:02:00.000Z",
    downloadCount: 0,
  },
  {
    id: "res_3",
    title: "Backend Engineer — Stripe",
    templateId: "tpl_forge",
    templateName: "Forge",
    status: "compiled",
    updatedAt: "2026-06-29T11:45:00.000Z",
    downloadCount: 12,
  },
  {
    id: "res_4",
    title: "New Grad — Microsoft",
    templateId: "tpl_index",
    templateName: "Index",
    status: "failed",
    updatedAt: "2026-06-20T08:15:00.000Z",
    downloadCount: 1,
  },
]

export const mockDashboardStats: DashboardStats = {
  totalResumes: 4,
  totalDownloads: 18,
  mostUsedTemplate: "Atlas",
  lastEditedAt: "2026-07-08T09:24:00.000Z",
}

export const mockActivity: ActivityPoint[] = [
  { date: "Jan", resumesCreated: 1, downloads: 2 },
  { date: "Feb", resumesCreated: 2, downloads: 3 },
  { date: "Mar", resumesCreated: 0, downloads: 1 },
  { date: "Apr", resumesCreated: 3, downloads: 5 },
  { date: "May", resumesCreated: 1, downloads: 4 },
  { date: "Jun", resumesCreated: 2, downloads: 6 },
  { date: "Jul", resumesCreated: 1, downloads: 3 },
]

export const mockResumeData: ResumeData = {
  id: "res_1",
  title: "Frontend Engineer — Google",
  templateId: "tpl_atlas",
  status: "compiled",
  personalInfo: {
    fullName: "Aditi Sharma",
    email: "aditi.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
    website: "aditisharma.dev",
    linkedin: "linkedin.com/in/aditisharma",
    github: "github.com/aditisharma",
    summary:
      "Frontend engineer with 4 years of experience building performant, accessible React applications used by millions of users.",
  },
  education: [
    {
      id: "edu_1",
      institution: "Indian Institute of Technology, Bombay",
      degree: "B.Tech",
      fieldOfStudy: "Computer Science",
      startDate: "2018-08",
      endDate: "2022-05",
      gpa: "8.9/10",
      description: "Relevant coursework: Data Structures, Distributed Systems, HCI.",
    },
  ],
  experience: [
    {
      id: "exp_1",
      company: "Razorpay",
      role: "Senior Frontend Engineer",
      location: "Bengaluru, India",
      startDate: "2024-03",
      endDate: "",
      current: true,
      bullets: [
        "Led migration of the merchant dashboard to React Server Components, cutting TTI by 38%.",
        "Built a reusable design system adopted across 6 internal product teams.",
        "Mentored 3 junior engineers through structured pairing and code review.",
      ],
    },
    {
      id: "exp_2",
      company: "Swiggy",
      role: "Frontend Engineer",
      location: "Bengaluru, India",
      startDate: "2022-06",
      endDate: "2024-02",
      current: false,
      bullets: [
        "Shipped the restaurant partner onboarding flow, reducing drop-off by 22%.",
        "Introduced automated visual regression testing across the web app.",
      ],
    },
  ],
  projects: [
    {
      id: "proj_1",
      name: "OpenResume",
      description: "Open-source LaTeX resume generator with live preview.",
      technologies: ["Next.js", "TypeScript", "LaTeX"],
      link: "github.com/aditisharma/openresume",
      startDate: "2025-01",
      endDate: "2025-04",
    },
  ],
  skills: [
    { id: "sk_1", category: "Languages", items: ["TypeScript", "JavaScript", "Python"] },
    { id: "sk_2", category: "Frameworks", items: ["React", "Next.js", "Node.js"] },
    { id: "sk_3", category: "Tools", items: ["Docker", "PostgreSQL", "Figma"] },
  ],
  achievements: [
    { id: "ach_1", title: "Speaker, React India 2025", description: "Talk on Server Components performance." },
    { id: "ach_2", title: "Winner, Razorpay Internal Hackathon 2024" },
  ],
  createdAt: "2026-05-01T10:00:00.000Z",
  updatedAt: "2026-07-08T09:24:00.000Z",
  downloadCount: 5,
  versions: [
    { id: "ver_3", version: 3, createdAt: "2026-07-08T09:24:00.000Z", pdfUrl: "#", fileSizeKb: 182 },
    { id: "ver_2", version: 2, createdAt: "2026-06-20T16:10:00.000Z", pdfUrl: "#", fileSizeKb: 176 },
    { id: "ver_1", version: 1, createdAt: "2026-05-01T10:30:00.000Z", pdfUrl: "#", fileSizeKb: 164 },
  ],
}
