"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Plus, Trash2, FolderGit2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import type { ResumeFormValues } from "@/lib/schemas/resume-schema"

function ProjectBullets({ index }: { index: number }) {
  const { register, watch, setValue } = useFormContext<ResumeFormValues>()
  const bulletsPath = `projects.${index}.bullets` as const
  const bullets = watch(bulletsPath) ?? []

  function addBullet() {
    setValue(bulletsPath, [...bullets, ""], { shouldDirty: true })
  }

  function removeBullet(bulletIndex: number) {
    setValue(
      bulletsPath,
      bullets.filter((_, i) => i !== bulletIndex),
      { shouldDirty: true }
    )
  }

  return (
    <Field>
      <FieldLabel>Highlights</FieldLabel>
      <div className="flex flex-col gap-2">
        {bullets.map((_, bulletIndex) => (
          <div key={bulletIndex} className="flex gap-2">
            <Input
              placeholder="Architected a full-stack feature that improved X by Y%"
              {...register(`projects.${index}.bullets.${bulletIndex}`)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeBullet(bulletIndex)}
              aria-label="Remove bullet"
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" className="w-fit" onClick={addBullet}>
        <Plus />
        Add bullet
      </Button>
    </Field>
  )
}

export function ProjectsSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: "projects" })

  function addEntry() {
    append({
      name: "",
      techStack: "",
      githubLink: "",
      demoLink: "",
      bullets: [""],
    })
  }

  if (fields.length === 0) {
    return (
      <Empty>
        <EmptyMedia>
          <FolderGit2 className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No projects added</EmptyTitle>
        <EmptyDescription>Showcase side projects or open-source work.</EmptyDescription>
        <Button size="sm" onClick={addEntry} className="mt-2">
          <Plus />
          Add project
        </Button>
      </Empty>
    )
  }

  return (
    <FieldGroup>
      {fields.map((field, index) => (
        <div key={field.id}>
          {index > 0 && <FieldSeparator />}
          <div className="grid gap-4 @md/field-group:grid-cols-2">
            <Field data-invalid={!!errors.projects?.[index]?.name}>
              <FieldLabel>Project name</FieldLabel>
              <Input {...register(`projects.${index}.name`)} />
              <FieldError errors={[errors.projects?.[index]?.name]} />
            </Field>
            <Field data-invalid={!!errors.projects?.[index]?.techStack}>
              <FieldLabel>Tech stack</FieldLabel>
              <Input placeholder="React, Node.js, PostgreSQL" {...register(`projects.${index}.techStack`)} />
              <FieldError errors={[errors.projects?.[index]?.techStack]} />
            </Field>
            <Field>
              <FieldLabel>GitHub link (optional)</FieldLabel>
              <Input placeholder="https://github.com/you/project" {...register(`projects.${index}.githubLink`)} />
            </Field>
            <Field>
              <FieldLabel>Demo link (optional)</FieldLabel>
              <Input placeholder="https://project.example.com" {...register(`projects.${index}.demoLink`)} />
            </Field>
          </div>

          <ProjectBullets index={index} />

          <div className="flex justify-end pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              aria-label="Remove project entry"
            >
              <Trash2 />
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addEntry} className="w-fit">
        <Plus />
        Add project
      </Button>
    </FieldGroup>
  )
}
