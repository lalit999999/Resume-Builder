import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export class UnauthenticatedError extends Error {}

/**
 * Resolves the current Clerk session to our internal `User` row, creating it
 * on first sight. Never trust a userId from the request body — this is the
 * only source of truth for "who is making this request."
 */
export async function requireUser() {
  const { userId: clerkId } = await auth()
  if (!clerkId) throw new UnauthenticatedError()

  const existing = await prisma.user.findUnique({ where: { clerkId } })
  if (existing) return existing

  const clerkUser = await currentUser()
  const email = clerkUser?.primaryEmailAddress?.emailAddress
  if (!email) throw new UnauthenticatedError()

  return prisma.user.create({ data: { clerkId, email } })
}
