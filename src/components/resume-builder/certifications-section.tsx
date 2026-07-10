"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Plus, Trash2, Award } from "lucide-react"
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

export function CertificationsSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: "certifications" })

  function addEntry() {
    append({ issuer: "", title: "", link: "", date: "" })
  }

  if (fields.length === 0) {
    return (
      <Empty>
        <EmptyMedia>
          <Award className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No certifications added</EmptyTitle>
        <EmptyDescription>Add certificates and badges you&apos;ve earned.</EmptyDescription>
        <Button size="sm" onClick={addEntry} className="mt-2">
          <Plus />
          Add certification
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
            <Field data-invalid={!!errors.certifications?.[index]?.issuer}>
              <FieldLabel>Issuer</FieldLabel>
              <Input placeholder="Oracle" {...register(`certifications.${index}.issuer`)} />
              <FieldError errors={[errors.certifications?.[index]?.issuer]} />
            </Field>
            <Field data-invalid={!!errors.certifications?.[index]?.title}>
              <FieldLabel>Title</FieldLabel>
              <Input {...register(`certifications.${index}.title`)} />
              <FieldError errors={[errors.certifications?.[index]?.title]} />
            </Field>
            <Field>
              <FieldLabel>Link (optional)</FieldLabel>
              <Input placeholder="https://credential.example.com" {...register(`certifications.${index}.link`)} />
            </Field>
            <Field data-invalid={!!errors.certifications?.[index]?.date}>
              <FieldLabel>Date</FieldLabel>
              <Input placeholder="Issued Sep 2025" {...register(`certifications.${index}.date`)} />
              <FieldError errors={[errors.certifications?.[index]?.date]} />
            </Field>
          </div>
          <div className="flex justify-end pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              aria-label="Remove certification entry"
            >
              <Trash2 />
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addEntry} className="w-fit">
        <Plus />
        Add certification
      </Button>
    </FieldGroup>
  )
}
