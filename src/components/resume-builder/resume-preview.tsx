"use client"

import { useFormContext } from "react-hook-form"
import { Mail, Phone, MapPin, Globe } from "lucide-react"
import { format } from "date-fns"
import type { ResumeFormValues } from "@/lib/schemas/resume-schema"

function formatMonth(value: string) {
  if (!value) return "Present"
  const [year, month] = value.split("-")
  if (!year || !month) return value
  return format(new Date(Number(year), Number(month) - 1), "MMM yyyy")
}

export function ResumePreview() {
  const { watch } = useFormContext<ResumeFormValues>()
  const values = watch()
  const { personalInfo, education, experience, projects, skills, achievements } = values

  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg border bg-white p-8 text-neutral-900 shadow-sm dark:bg-white">
      <header className="border-b border-neutral-200 pb-4">
        <h1 className="text-2xl font-semibold">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="size-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="size-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="size-3" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="size-3" />
              {personalInfo.website}
            </span>
          )}
        </div>
        {personalInfo.summary && (
          <p className="mt-3 text-sm text-neutral-700">{personalInfo.summary}</p>
        )}
      </header>

      {experience.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Experience
          </h2>
          <div className="mt-2 flex flex-col gap-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-medium">
                    {exp.role || "Role"} &middot; {exp.company || "Company"}
                  </p>
                  <p className="shrink-0 text-xs text-neutral-500">
                    {formatMonth(exp.startDate)} — {exp.current ? "Present" : formatMonth(exp.endDate)}
                  </p>
                </div>
                <ul className="mt-1 list-disc pl-4 text-sm text-neutral-700">
                  {exp.bullets.filter(Boolean).map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Education
          </h2>
          <div className="mt-2 flex flex-col gap-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium">
                  {edu.degree || "Degree"}, {edu.fieldOfStudy || "Field"} &middot;{" "}
                  {edu.institution || "Institution"}
                </p>
                <p className="shrink-0 text-xs text-neutral-500">
                  {formatMonth(edu.startDate)} — {formatMonth(edu.endDate)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Projects
          </h2>
          <div className="mt-2 flex flex-col gap-2">
            {projects.map((project) => (
              <div key={project.id}>
                <p className="text-sm font-medium">{project.name || "Project name"}</p>
                <p className="text-sm text-neutral-700">{project.description}</p>
                {project.technologies.length > 0 && (
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {project.technologies.join(" · ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Skills
          </h2>
          <div className="mt-2 flex flex-col gap-1">
            {skills.map((group) => (
              <p key={group.id} className="text-sm text-neutral-700">
                <span className="font-medium">{group.category || "Category"}: </span>
                {group.items.join(", ")}
              </p>
            ))}
          </div>
        </section>
      )}

      {achievements.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Achievements
          </h2>
          <div className="mt-2 flex flex-col gap-1">
            {achievements.map((achievement) => (
              <p key={achievement.id} className="text-sm text-neutral-700">
                <span className="font-medium">{achievement.title}</span>
                {achievement.description && ` — ${achievement.description}`}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
