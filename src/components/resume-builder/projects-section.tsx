"use client"

import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import { Plus, Trash2, FolderGit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { TagInput } from "@/components/resume-builder/tag-input"
import type { ResumeFormValues } from "@/lib/schemas/resume-schema"

export function ProjectsSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: "projects" })

  function addEntry() {
    append({
      id: crypto.randomUUID(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      startDate: "",
      endDate: "",
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
            <Field>
              <FieldLabel>Link (optional)</FieldLabel>
              <Input placeholder="github.com/you/project" {...register(`projects.${index}.link`)} />
            </Field>
          </div>
          <Field data-invalid={!!errors.projects?.[index]?.description}>
            <FieldLabel>Description</FieldLabel>
            <Textarea rows={2} {...register(`projects.${index}.description`)} />
            <FieldError errors={[errors.projects?.[index]?.description]} />
          </Field>
          <Field>
            <FieldLabel>Technologies</FieldLabel>
            <Controller
              control={control}
              name={`projects.${index}.technologies`}
              render={({ field: tagField }) => (
                <TagInput
                  value={tagField.value}
                  onChange={tagField.onChange}
                  placeholder="Type a technology and press Enter"
                  aria-label="Technologies"
                />
              )}
            />
          </Field>
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
