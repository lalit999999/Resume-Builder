"use client"

import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import { Plus, Trash2, Briefcase, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
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
      id: crypto.randomUUID(),
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
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
            <Field data-invalid={!!errors.experience?.[index]?.role}>
              <FieldLabel>Role</FieldLabel>
              <Input {...register(`experience.${index}.role`)} />
              <FieldError errors={[errors.experience?.[index]?.role]} />
            </Field>
            <Field data-invalid={!!errors.experience?.[index]?.location}>
              <FieldLabel>Location</FieldLabel>
              <Input {...register(`experience.${index}.location`)} />
              <FieldError errors={[errors.experience?.[index]?.location]} />
            </Field>
            <Field orientation="horizontal">
              <Controller
                control={control}
                name={`experience.${index}.current`}
                render={({ field: checkboxField }) => (
                  <Checkbox
                    id={`current-${field.id}`}
                    checked={checkboxField.value}
                    onCheckedChange={(checked) => checkboxField.onChange(!!checked)}
                  />
                )}
              />
              <FieldLabel htmlFor={`current-${field.id}`} className="font-normal">
                I currently work here
              </FieldLabel>
            </Field>
            <Field data-invalid={!!errors.experience?.[index]?.startDate}>
              <FieldLabel>Start date</FieldLabel>
              <Input type="month" {...register(`experience.${index}.startDate`)} />
              <FieldError errors={[errors.experience?.[index]?.startDate]} />
            </Field>
            <Field>
              <FieldLabel>End date</FieldLabel>
              <Input type="month" {...register(`experience.${index}.endDate`)} />
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
