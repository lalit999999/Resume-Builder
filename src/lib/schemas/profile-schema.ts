import { z } from "zod"

export const profileInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  bio: z.string().max(280, "Keep your bio under 280 characters").optional(),
})

export type ProfileInfoValues = z.infer<typeof profileInfoSchema>

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type PasswordValues = z.infer<typeof passwordSchema>
