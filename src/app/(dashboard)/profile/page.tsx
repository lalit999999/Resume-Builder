import { currentUser } from "@clerk/nextjs/server"
import { Separator } from "@/components/ui/separator"
import { AvatarUploadCard } from "@/components/profile/avatar-upload-card"
import { PersonalInfoCard } from "@/components/profile/personal-info-card"
import { ChangePasswordCard } from "@/components/profile/change-password-card"
import { DangerZoneCard } from "@/components/profile/danger-zone-card"
import type { UserProfile } from "@/types/user"

export default async function ProfilePage() {
  const clerkUser = await currentUser()

  // Clerk is the source of truth for name/email/avatar. `phone`/`bio` aren't part of
  // Clerk's profile or our Prisma User model, and no profile-edit route is in scope
  // yet, so they're left blank rather than faked.
  const user: UserProfile = {
    id: clerkUser?.id ?? "",
    name: clerkUser
      ? [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || "Unnamed user"
      : "Unnamed user",
    email: clerkUser?.primaryEmailAddress?.emailAddress ?? "",
    avatarUrl: clerkUser?.imageUrl,
    createdAt: clerkUser ? new Date(clerkUser.createdAt).toISOString() : new Date().toISOString(),
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal information and account security.
        </p>
      </div>

      <AvatarUploadCard user={user} />
      <PersonalInfoCard user={user} />
      <ChangePasswordCard />
      <Separator />
      <DangerZoneCard />
    </div>
  )
}
