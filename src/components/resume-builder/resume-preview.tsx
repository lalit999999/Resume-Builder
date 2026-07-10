"use client"

import { useFormContext } from "react-hook-form"
import { Mail, Phone, MapPin, Globe } from "lucide-react"
import type { ResumeFormValues } from "@/lib/schemas/resume-schema"

export function ResumePreview() {
  const { watch } = useFormContext<ResumeFormValues>()
  const values = watch()
  const { header, education, experience, projects, skills, certifications, positions } = values

  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg border bg-white p-8 text-neutral-900 shadow-sm dark:bg-white">
      <header className="border-b border-neutral-200 pb-4">
        <h1 className="text-2xl font-semibold">{header.name || "Your Name"}</h1>
        <p className="text-sm text-neutral-600">
          {[header.course, header.department, header.institute].filter(Boolean).join(" · ")}
        </p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-600">
          {header.email && (
            <span className="flex items-center gap-1">
              <Mail className="size-3" />
              {header.email}
            </span>
          )}
          {header.phone && (
            <span className="flex items-center gap-1">
              <Phone className="size-3" />
              {header.phone}
            </span>
          )}
          {header.location && (
            <span className="flex items-center gap-1">
              <MapPin className="size-3" />
              {header.location}
            </span>
          )}
          {header.website && (
            <span className="flex items-center gap-1">
              <Globe className="size-3" />
              {header.website}
            </span>
          )}
        </div>
      </header>

      {experience.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Experience
          </h2>
          <div className="mt-2 flex flex-col gap-3">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-medium">
                    {exp.title || "Title"} &middot; {exp.company || "Company"}
                  </p>
                  <p className="shrink-0 text-xs text-neutral-500">{exp.duration}</p>
                </div>
                <ul className="mt-1 list-disc pl-4 text-sm text-neutral-700">
                  {exp.bullets.filter(Boolean).map((bullet, j) => (
                    <li key={j}>{bullet}</li>
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
            {education.map((edu, i) => (
              <div key={i} className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium">
                  {edu.degree || "Degree"} &middot; {edu.institute || "Institute"}
                </p>
                <p className="shrink-0 text-xs text-neutral-500">
                  {edu.cgpa} {edu.year && `· ${edu.year}`}
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
            {projects.map((project, i) => (
              <div key={i}>
                <p className="text-sm font-medium">{project.name || "Project name"}</p>
                {project.techStack && (
                  <p className="mt-0.5 text-xs text-neutral-500">{project.techStack}</p>
                )}
                <ul className="mt-1 list-disc pl-4 text-sm text-neutral-700">
                  {project.bullets.filter(Boolean).map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
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
            {skills.map((group, i) => (
              <p key={i} className="text-sm text-neutral-700">
                <span className="font-medium">{group.category || "Category"}: </span>
                {group.items.join(", ")}
              </p>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Certifications
          </h2>
          <div className="mt-2 flex flex-col gap-1">
            {certifications.map((cert, i) => (
              <p key={i} className="text-sm text-neutral-700">
                <span className="font-medium">{cert.issuer}</span>
                {cert.title && ` — ${cert.title}`}
                {cert.date && ` (${cert.date})`}
              </p>
            ))}
          </div>
        </section>
      )}

      {positions.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Positions of Responsibility
          </h2>
          <div className="mt-2 flex flex-col gap-1">
            {positions.map((position, i) => (
              <div key={i} className="flex items-baseline justify-between gap-2">
                <p className="text-sm text-neutral-700">
                  <span className="font-medium">{position.title}</span>
                  {position.organization && `, ${position.organization}`}
                </p>
                <p className="shrink-0 text-xs text-neutral-500">{position.duration}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
