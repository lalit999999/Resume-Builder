import { format } from "date-fns"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { UserProfile } from "@/types/user"

export function AccountTab({ user }: { user: UserProfile }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account details</CardTitle>
        <CardDescription>Basic information tied to your account.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-4 @md/field-group:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="settings-name">Name</FieldLabel>
            <Input id="settings-name" value={user.name} readOnly disabled />
          </Field>
          <Field>
            <FieldLabel htmlFor="settings-email">Email</FieldLabel>
            <Input id="settings-email" value={user.email} readOnly disabled />
          </Field>
        </div>
        <p className="text-sm text-muted-foreground">
          Member since {format(new Date(user.createdAt), "MMMM yyyy")}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild>
          <Link href="/profile">Edit in Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
