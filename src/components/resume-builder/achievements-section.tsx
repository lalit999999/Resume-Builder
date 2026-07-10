"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Plus, Trash2, Trophy } from "lucide-react"
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

export function AchievementsSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: "achievements" })

  function addEntry() {
    append({ id: crypto.randomUUID(), title: "", description: "", date: "" })
  }

  if (fields.length === 0) {
    return (
      <Empty>
        <EmptyMedia>
          <Trophy className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No achievements added</EmptyTitle>
        <EmptyDescription>Awards, talks, publications, and more.</EmptyDescription>
        <Button size="sm" onClick={addEntry} className="mt-2">
          <Plus />
          Add achievement
        </Button>
      </Empty>
    )
  }

  return (
    <FieldGroup>
      {fields.map((field, index) => (
        <div key={field.id}>
          {index > 0 && <FieldSeparator />}
          <div className="grid gap-4 @md/field-group:grid-cols-[1fr_1fr_140px]">
            <Field data-invalid={!!errors.achievements?.[index]?.title}>
              <FieldLabel>Title</FieldLabel>
              <Input {...register(`achievements.${index}.title`)} />
              <FieldError errors={[errors.achievements?.[index]?.title]} />
            </Field>
            <Field>
              <FieldLabel>Description (optional)</FieldLabel>
              <Input {...register(`achievements.${index}.description`)} />
            </Field>
            <Field>
              <FieldLabel>Date (optional)</FieldLabel>
              <Input type="month" {...register(`achievements.${index}.date`)} />
            </Field>
          </div>
          <div className="flex justify-end pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              aria-label="Remove achievement entry"
            >
              <Trash2 />
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addEntry} className="w-fit">
        <Plus />
        Add achievement
      </Button>
    </FieldGroup>
  )
}
