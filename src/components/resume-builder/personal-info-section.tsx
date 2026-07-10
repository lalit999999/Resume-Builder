"use client"

import { useFormContext } from "react-hook-form"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { ResumeFormValues } from "@/lib/schemas/resume-schema"

export function PersonalInfoSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ResumeFormValues>()
  const fieldErrors = errors.personalInfo

  return (
    <FieldGroup>
      <div className="grid gap-4 @md/field-group:grid-cols-2">
        <Field data-invalid={!!fieldErrors?.fullName}>
          <FieldLabel htmlFor="fullName">Full name</FieldLabel>
          <Input id="fullName" {...register("personalInfo.fullName")} />
          <FieldError errors={[fieldErrors?.fullName]} />
        </Field>
        <Field data-invalid={!!fieldErrors?.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" {...register("personalInfo.email")} />
          <FieldError errors={[fieldErrors?.email]} />
        </Field>
        <Field data-invalid={!!fieldErrors?.phone}>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input id="phone" {...register("personalInfo.phone")} />
          <FieldError errors={[fieldErrors?.phone]} />
        </Field>
        <Field data-invalid={!!fieldErrors?.location}>
          <FieldLabel htmlFor="location">Location</FieldLabel>
          <Input id="location" {...register("personalInfo.location")} />
          <FieldError errors={[fieldErrors?.location]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="website">Website</FieldLabel>
          <Input id="website" placeholder="yourname.dev" {...register("personalInfo.website")} />
        </Field>
        <Field>
          <FieldLabel htmlFor="linkedin">LinkedIn</FieldLabel>
          <Input id="linkedin" placeholder="linkedin.com/in/you" {...register("personalInfo.linkedin")} />
        </Field>
        <Field>
          <FieldLabel htmlFor="github">GitHub</FieldLabel>
          <Input id="github" placeholder="github.com/you" {...register("personalInfo.github")} />
        </Field>
      </div>
      <Field data-invalid={!!fieldErrors?.summary}>
        <FieldLabel htmlFor="summary">Summary</FieldLabel>
        <FieldContent>
          <Textarea
            id="summary"
            rows={4}
            placeholder="A short, punchy overview of your experience."
            {...register("personalInfo.summary")}
          />
          <FieldDescription>Two to three sentences works best.</FieldDescription>
        </FieldContent>
        <FieldError errors={[fieldErrors?.summary]} />
      </Field>
    </FieldGroup>
  )
}
