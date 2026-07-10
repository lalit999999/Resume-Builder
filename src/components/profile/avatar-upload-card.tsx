"use client"

import { useRef, useState } from "react"
import { toast } from "sonner"
import { Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserProfile } from "@/types/user"

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()
}

export function AvatarUploadCard({ user }: { user: UserProfile }) {
  const [preview, setPreview] = useState<string | undefined>(user.avatarUrl)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    // TODO: upload file and wire to PUT /api/resume (user profile endpoint)
    toast.success("Profile photo updated")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile photo</CardTitle>
        <CardDescription>Shown on your profile and shared resumes.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage src={preview} alt={user.name} />
          <AvatarFallback className="text-lg">{initials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
            <Camera />
            Change photo
          </Button>
          <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          aria-label="Upload profile photo"
          onChange={handleFileChange}
        />
      </CardContent>
    </Card>
  )
}
