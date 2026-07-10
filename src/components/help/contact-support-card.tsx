"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Mail, MessageCircle, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"

const contactSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Give us a bit more detail (10+ characters)"),
})

type ContactValues = z.infer<typeof contactSchema>

export function ContactSupportCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "", message: "" },
  })

  async function onSubmit(values: ContactValues) {
    // TODO: wire to a support-ticket creation endpoint
    void values
    await new Promise((resolve) => setTimeout(resolve, 600))
    toast.success("Message sent", { description: "We'll get back to you within 1 business day." })
    reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact support</CardTitle>
        <CardDescription>Can&apos;t find what you&apos;re looking for? Send us a message.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <FieldGroup>
            <Field data-invalid={!!errors.subject}>
              <FieldLabel htmlFor="subject">Subject</FieldLabel>
              <Input id="subject" {...register("subject")} />
              <FieldError errors={[errors.subject]} />
            </Field>
            <Field data-invalid={!!errors.message}>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea id="message" rows={4} {...register("message")} />
              <FieldError errors={[errors.message]} />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? "Sending..." : "Send message"}
          </Button>
          <div className="flex w-full flex-col gap-2 border-t pt-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
            <a href="mailto:support@resumebuilder.app" className="flex items-center gap-1.5 hover:text-foreground">
              <Mail className="size-4" />
              support@resumebuilder.app
            </a>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="size-4" />
              Live chat, 9am–6pm IST
            </span>
            <a href="#" className="flex items-center gap-1.5 hover:text-foreground">
              <BookOpen className="size-4" />
              Docs & tutorials
            </a>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
