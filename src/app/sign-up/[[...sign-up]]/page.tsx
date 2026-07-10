import type { Metadata } from "next"
import { SignUp } from "@clerk/nextjs"
import { AuthLayout } from "@/components/auth/auth-layout"
import { clerkAppearance } from "@/lib/clerk-appearance"

export const metadata: Metadata = {
  title: "Sign Up | Resume Builder",
}

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUp
        appearance={clerkAppearance}
        signInUrl="/sign-in"
        forceRedirectUrl="/dashboard"
      />
    </AuthLayout>
  )
}
