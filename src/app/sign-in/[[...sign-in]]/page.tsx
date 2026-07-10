import type { Metadata } from "next"
import { SignIn } from "@clerk/nextjs"
import { AuthLayout } from "@/components/auth/auth-layout"
import { clerkAppearance } from "@/lib/clerk-appearance"

export const metadata: Metadata = {
  title: "Sign In | Resume Builder",
}

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignIn
        appearance={clerkAppearance}
        signUpUrl="/sign-up"
        forceRedirectUrl="/dashboard"
      />
    </AuthLayout>
  )
}
