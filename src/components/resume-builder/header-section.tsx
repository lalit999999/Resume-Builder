"use client"

import { useFormContext } from "react-hook-form"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { ResumeFormValues } from "@/lib/schemas/resume-schema"

export function HeaderSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ResumeFormValues>()
  const fieldErrors = errors.header

  return (
    <FieldGroup>
      <div className="grid gap-4 @md/field-group:grid-cols-2">
        <Field data-invalid={!!fieldErrors?.name}>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <Input id="name" {...register("header.name")} />
          <FieldError errors={[fieldErrors?.name]} />
        </Field>
        <Field data-invalid={!!fieldErrors?.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" {...register("header.email")} />
          <FieldError errors={[fieldErrors?.email]} />
        </Field>
        <Field data-invalid={!!fieldErrors?.phone}>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input id="phone" {...register("header.phone")} />
          <FieldError errors={[fieldErrors?.phone]} />
        </Field>
        <Field data-invalid={!!fieldErrors?.location}>
          <FieldLabel htmlFor="location">Location</FieldLabel>
          <Input id="location" {...register("header.location")} />
          <FieldError errors={[fieldErrors?.location]} />
        </Field>
        <Field data-invalid={!!fieldErrors?.course}>
          <FieldLabel htmlFor="course">Course</FieldLabel>
          <Input id="course" placeholder="Bachelor of Technology" {...register("header.course")} />
          <FieldError errors={[fieldErrors?.course]} />
        </Field>
        <Field data-invalid={!!fieldErrors?.department}>
          <FieldLabel htmlFor="department">Department</FieldLabel>
          <Input id="department" placeholder="Computer Science and Engineering" {...register("header.department")} />
          <FieldError errors={[fieldErrors?.department]} />
        </Field>
        <Field data-invalid={!!fieldErrors?.institute}>
          <FieldLabel htmlFor="institute">Institute</FieldLabel>
          <Input id="institute" {...register("header.institute")} />
          <FieldError errors={[fieldErrors?.institute]} />
        </Field>
        <Field data-invalid={!!fieldErrors?.website}>
          <FieldLabel htmlFor="website">Website</FieldLabel>
          <Input id="website" placeholder="https://yourname.dev" {...register("header.website")} />
          <FieldError errors={[fieldErrors?.website]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="linkedin">LinkedIn</FieldLabel>
          <Input id="linkedin" placeholder="yourname" {...register("header.linkedin")} />
        </Field>
        <Field>
          <FieldLabel htmlFor="github">GitHub</FieldLabel>
          <Input id="github" placeholder="yourname" {...register("header.github")} />
        </Field>
      </div>
    </FieldGroup>
  )
}
