"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { passwordSchema, type PasswordValues } from "@/lib/schemas/profile-schema"

export function ChangePasswordCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  })

  async function onSubmit(values: PasswordValues) {
    // TODO: wire to an auth password-change endpoint (managed by Clerk)
    void values
    await new Promise((resolve) => setTimeout(resolve, 600))
    toast.success("Password updated")
    reset()
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
          <CardDescription>Choose a strong password you don&apos;t use elsewhere.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field data-invalid={!!errors.currentPassword}>
              <FieldLabel htmlFor="currentPassword">Current password</FieldLabel>
              <Input id="currentPassword" type="password" {...register("currentPassword")} />
              <FieldError errors={[errors.currentPassword]} />
            </Field>
            <div className="grid gap-4 @md/field-group:grid-cols-2">
              <Field data-invalid={!!errors.newPassword}>
                <FieldLabel htmlFor="newPassword">New password</FieldLabel>
                <Input id="newPassword" type="password" {...register("newPassword")} />
                <FieldError errors={[errors.newPassword]} />
              </Field>
              <Field data-invalid={!!errors.confirmPassword}>
                <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
                <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
                <FieldError errors={[errors.confirmPassword]} />
              </Field>
            </div>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update password"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
