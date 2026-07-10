"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Field, FieldContent, FieldLabel, FieldDescription, FieldSeparator } from "@/components/ui/field"

const NOTIFICATION_ITEMS = [
  {
    key: "compileSuccess",
    label: "Compile complete",
    description: "Get notified when a resume finishes compiling to PDF.",
  },
  {
    key: "compileFailed",
    label: "Compile failures",
    description: "Get notified if a resume fails to compile.",
  },
  {
    key: "weeklyDigest",
    label: "Weekly digest",
    description: "A weekly summary of your resume activity.",
  },
  {
    key: "productNews",
    label: "Product news",
    description: "Occasional updates about new templates and features.",
  },
] as const

type NotificationKey = (typeof NOTIFICATION_ITEMS)[number]["key"]

export function NotificationsTab() {
  const [values, setValues] = useState<Record<NotificationKey, boolean>>({
    compileSuccess: true,
    compileFailed: true,
    weeklyDigest: false,
    productNews: false,
  })

  function handleSave() {
    // TODO: wire to a notification-preferences update endpoint
    toast.success("Notification settings saved")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what you want to be notified about.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        {NOTIFICATION_ITEMS.map((item, index) => (
          <div key={item.key}>
            {index > 0 && <FieldSeparator />}
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor={item.key}>{item.label}</FieldLabel>
                <FieldDescription>{item.description}</FieldDescription>
              </FieldContent>
              <Switch
                id={item.key}
                checked={values[item.key]}
                onCheckedChange={(checked) =>
                  setValues((prev) => ({ ...prev, [item.key]: checked }))
                }
              />
            </Field>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save notification settings</Button>
      </CardFooter>
    </Card>
  )
}
