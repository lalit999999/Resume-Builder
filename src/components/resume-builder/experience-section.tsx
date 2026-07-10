"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Plus, Trash2, Briefcase, X } from "lucide-react"
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

function ExperienceBullets({ index }: { index: number }) {
  const { register, watch, setValue } = useFormContext<ResumeFormValues>()
  // useFieldArray's array-path inference hits a recursion limit on this
  // schema's sibling optional fields, so bullets are managed directly via
  // watch/setValue instead (register at this depth type-checks fine).
  const bulletsPath = `experience.${index}.bullets` as const
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
              placeholder="Led migration that improved load time by 40%"
              {...register(`experience.${index}.bullets.${bulletIndex}`)}
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

export function ExperienceSection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: "experience" })

  function addEntry() {
    append({
      company: "",
      companyLink: "",
      location: "",
      title: "",
      duration: "",
      bullets: [""],
    })
  }

  if (fields.length === 0) {
    return (
      <Empty>
        <EmptyMedia>
          <Briefcase className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No experience added</EmptyTitle>
        <EmptyDescription>Add roles you&apos;ve held, most recent first.</EmptyDescription>
        <Button size="sm" onClick={addEntry} className="mt-2">
          <Plus />
          Add experience
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
            <Field data-invalid={!!errors.experience?.[index]?.company}>
              <FieldLabel>Company</FieldLabel>
              <Input {...register(`experience.${index}.company`)} />
              <FieldError errors={[errors.experience?.[index]?.company]} />
            </Field>
            <Field>
              <FieldLabel>Company link (optional)</FieldLabel>
              <Input placeholder="https://company.com" {...register(`experience.${index}.companyLink`)} />
            </Field>
            <Field data-invalid={!!errors.experience?.[index]?.title}>
              <FieldLabel>Title</FieldLabel>
              <Input {...register(`experience.${index}.title`)} />
              <FieldError errors={[errors.experience?.[index]?.title]} />
            </Field>
            <Field data-invalid={!!errors.experience?.[index]?.location}>
              <FieldLabel>Location</FieldLabel>
              <Input {...register(`experience.${index}.location`)} />
              <FieldError errors={[errors.experience?.[index]?.location]} />
            </Field>
            <Field data-invalid={!!errors.experience?.[index]?.duration}>
              <FieldLabel>Duration</FieldLabel>
              <Input placeholder="Month Year - Month Year" {...register(`experience.${index}.duration`)} />
              <FieldError errors={[errors.experience?.[index]?.duration]} />
            </Field>
          </div>

          <ExperienceBullets index={index} />

          <div className="flex justify-end pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              aria-label="Remove experience entry"
            >
              <Trash2 />
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addEntry} className="w-fit">
        <Plus />
        Add experience
      </Button>
    </FieldGroup>
  )
}
