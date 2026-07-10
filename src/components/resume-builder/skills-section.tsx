"use client"

import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import { Plus, Trash2, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { TagInput } from "@/components/resume-builder/tag-input"
import type { ResumeFormValues } from "@/lib/schemas/resume-schema"

export function SkillsSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: "skills" })

  function addEntry() {
    append({ id: crypto.randomUUID(), category: "", items: [] })
  }

  if (fields.length === 0) {
    return (
      <Empty>
        <EmptyMedia>
          <Wrench className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No skill groups added</EmptyTitle>
        <EmptyDescription>Group your skills by category, e.g. Languages, Tools.</EmptyDescription>
        <Button size="sm" onClick={addEntry} className="mt-2">
          <Plus />
          Add skill group
        </Button>
      </Empty>
    )
  }

  return (
    <FieldGroup>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-start gap-3">
          <div className="grid flex-1 gap-3 @md/field-group:grid-cols-[200px_1fr]">
            <Field data-invalid={!!errors.skills?.[index]?.category}>
              <FieldLabel>Category</FieldLabel>
              <Input placeholder="Languages" {...register(`skills.${index}.category`)} />
              <FieldError errors={[errors.skills?.[index]?.category]} />
            </Field>
            <Field data-invalid={!!errors.skills?.[index]?.items}>
              <FieldLabel>Skills</FieldLabel>
              <Controller
                control={control}
                name={`skills.${index}.items`}
                render={({ field: tagField }) => (
                  <TagInput
                    value={tagField.value}
                    onChange={tagField.onChange}
                    placeholder="Type a skill and press Enter"
                    aria-label="Skills"
                  />
                )}
              />
              <FieldError errors={[errors.skills?.[index]?.items]} />
            </Field>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="mt-6"
            onClick={() => remove(index)}
            aria-label="Remove skill group"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addEntry} className="w-fit">
        <Plus />
        Add skill group
      </Button>
    </FieldGroup>
  )
}
