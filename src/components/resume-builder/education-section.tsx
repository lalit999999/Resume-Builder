"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Plus, Trash2, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import type { ResumeFormValues } from "@/lib/schemas/resume-schema"

export function EducationSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: "education" })

  function addEntry() {
    append({
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: "",
    })
  }

  if (fields.length === 0) {
    return (
      <Empty>
        <EmptyMedia>
          <GraduationCap className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No education added</EmptyTitle>
        <EmptyDescription>Add your degrees and certifications.</EmptyDescription>
        <Button size="sm" onClick={addEntry} className="mt-2">
          <Plus />
          Add education
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
            <Field data-invalid={!!errors.education?.[index]?.institution}>
              <FieldLabel>Institution</FieldLabel>
              <Input {...register(`education.${index}.institution`)} />
              <FieldError errors={[errors.education?.[index]?.institution]} />
            </Field>
            <Field data-invalid={!!errors.education?.[index]?.degree}>
              <FieldLabel>Degree</FieldLabel>
              <Input placeholder="B.Tech" {...register(`education.${index}.degree`)} />
              <FieldError errors={[errors.education?.[index]?.degree]} />
            </Field>
            <Field data-invalid={!!errors.education?.[index]?.fieldOfStudy}>
              <FieldLabel>Field of study</FieldLabel>
              <Input {...register(`education.${index}.fieldOfStudy`)} />
              <FieldError errors={[errors.education?.[index]?.fieldOfStudy]} />
            </Field>
            <Field>
              <FieldLabel>GPA (optional)</FieldLabel>
              <Input {...register(`education.${index}.gpa`)} />
            </Field>
            <Field data-invalid={!!errors.education?.[index]?.startDate}>
              <FieldLabel>Start date</FieldLabel>
              <Input type="month" {...register(`education.${index}.startDate`)} />
              <FieldError errors={[errors.education?.[index]?.startDate]} />
            </Field>
            <Field data-invalid={!!errors.education?.[index]?.endDate}>
              <FieldLabel>End date</FieldLabel>
              <Input type="month" {...register(`education.${index}.endDate`)} />
              <FieldError errors={[errors.education?.[index]?.endDate]} />
            </Field>
          </div>
          <Field>
            <FieldLabel>Description (optional)</FieldLabel>
            <FieldContent>
              <Textarea rows={2} {...register(`education.${index}.description`)} />
            </FieldContent>
          </Field>
          <div className="flex justify-end pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              aria-label="Remove education entry"
            >
              <Trash2 />
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addEntry} className="w-fit">
        <Plus />
        Add education
      </Button>
    </FieldGroup>
  )
}
