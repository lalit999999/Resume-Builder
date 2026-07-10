"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Plus, Trash2, Users } from "lucide-react"
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

export function PositionsSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: "positions" })

  function addEntry() {
    append({ title: "", titleLink: "", organization: "", duration: "" })
  }

  if (fields.length === 0) {
    return (
      <Empty>
        <EmptyMedia>
          <Users className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No positions added</EmptyTitle>
        <EmptyDescription>Leadership roles, clubs, and committees.</EmptyDescription>
        <Button size="sm" onClick={addEntry} className="mt-2">
          <Plus />
          Add position
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
            <Field data-invalid={!!errors.positions?.[index]?.title}>
              <FieldLabel>Title</FieldLabel>
              <Input {...register(`positions.${index}.title`)} />
              <FieldError errors={[errors.positions?.[index]?.title]} />
            </Field>
            <Field>
              <FieldLabel>Title link (optional)</FieldLabel>
              <Input placeholder="https://linkedin.com/company/..." {...register(`positions.${index}.titleLink`)} />
            </Field>
            <Field data-invalid={!!errors.positions?.[index]?.organization}>
              <FieldLabel>Organization</FieldLabel>
              <Input {...register(`positions.${index}.organization`)} />
              <FieldError errors={[errors.positions?.[index]?.organization]} />
            </Field>
            <Field data-invalid={!!errors.positions?.[index]?.duration}>
              <FieldLabel>Duration</FieldLabel>
              <Input placeholder="March 2026 - present" {...register(`positions.${index}.duration`)} />
              <FieldError errors={[errors.positions?.[index]?.duration]} />
            </Field>
          </div>
          <div className="flex justify-end pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              aria-label="Remove position entry"
            >
              <Trash2 />
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addEntry} className="w-fit">
        <Plus />
        Add position
      </Button>
    </FieldGroup>
  )
}
