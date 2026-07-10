"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Plus, Trash2, GraduationCap } from "lucide-react"
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

export function EducationSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: "education" })

  function addEntry() {
    append({ degree: "", institute: "", cgpa: "", year: "" })
  }

  if (fields.length === 0) {
    return (
      <Empty>
        <EmptyMedia>
          <GraduationCap className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No education added</EmptyTitle>
        <EmptyDescription>Add your degrees and certificates.</EmptyDescription>
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
            <Field data-invalid={!!errors.education?.[index]?.degree}>
              <FieldLabel>Degree/Certificate</FieldLabel>
              <Input placeholder="B.Tech" {...register(`education.${index}.degree`)} />
              <FieldError errors={[errors.education?.[index]?.degree]} />
            </Field>
            <Field data-invalid={!!errors.education?.[index]?.institute}>
              <FieldLabel>Institute/Board</FieldLabel>
              <Input {...register(`education.${index}.institute`)} />
              <FieldError errors={[errors.education?.[index]?.institute]} />
            </Field>
            <Field data-invalid={!!errors.education?.[index]?.cgpa}>
              <FieldLabel>CGPA</FieldLabel>
              <Input {...register(`education.${index}.cgpa`)} />
              <FieldError errors={[errors.education?.[index]?.cgpa]} />
            </Field>
            <Field data-invalid={!!errors.education?.[index]?.year}>
              <FieldLabel>Year</FieldLabel>
              <Input placeholder="2024-29" {...register(`education.${index}.year`)} />
              <FieldError errors={[errors.education?.[index]?.year]} />
            </Field>
          </div>
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
