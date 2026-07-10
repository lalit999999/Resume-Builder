"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { Monitor, Moon, Sun } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import type { TemplateInfo } from "@/types/template"

export function PreferencesTab({ templates }: { templates: TemplateInfo[] }) {
  const { theme, setTheme } = useTheme()
  const [defaultTemplate, setDefaultTemplate] = useState(templates[0]?.id ?? "")

  function handleSave() {
    // TODO: wire to a user-preferences update endpoint
    toast.success("Preferences saved")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Customize how the app looks and behaves.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Field>
          <FieldLabel>Theme</FieldLabel>
          <ButtonGroup>
            <Button
              type="button"
              variant={theme === "light" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("light")}
            >
              <Sun />
              Light
            </Button>
            <Button
              type="button"
              variant={theme === "dark" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("dark")}
            >
              <Moon />
              Dark
            </Button>
            <Button
              type="button"
              variant={theme === "system" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("system")}
            >
              <Monitor />
              System
            </Button>
          </ButtonGroup>
          <FieldDescription>System follows your OS appearance setting.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="default-template">Default template</FieldLabel>
          <Select value={defaultTemplate} onValueChange={setDefaultTemplate}>
            <SelectTrigger id="default-template" className="w-full sm:w-72">
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldDescription>Used automatically for new resumes.</FieldDescription>
        </Field>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save preferences</Button>
      </CardFooter>
    </Card>
  )
}
