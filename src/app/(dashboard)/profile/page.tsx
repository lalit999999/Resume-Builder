import { Separator } from "@/components/ui/separator"
import { AvatarUploadCard } from "@/components/profile/avatar-upload-card"
import { PersonalInfoCard } from "@/components/profile/personal-info-card"
import { ChangePasswordCard } from "@/components/profile/change-password-card"
import { DangerZoneCard } from "@/components/profile/danger-zone-card"
import { mockUser } from "@/lib/mock-data"

export default function ProfilePage() {
  // TODO: replace with the authenticated user's profile data
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal information and account security.
        </p>
      </div>

      <AvatarUploadCard user={mockUser} />
      <PersonalInfoCard user={mockUser} />
      <ChangePasswordCard />
      <Separator />
      <DangerZoneCard />
    </div>
  )
}
