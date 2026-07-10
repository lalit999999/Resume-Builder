import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireUser, UnauthenticatedError } from "@/lib/auth"

export async function GET() {
  let user
  try {
    user = await requireUser()
  } catch (err) {
    if (err instanceof UnauthenticatedError) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })
    }
    throw err
  }

  const resumes = await prisma.resume.findMany({
    where: { userId: user.id },
    include: { versions: { orderBy: { versionNum: "desc" } } },
    orderBy: { updatedAt: "desc" },
  })

  return NextResponse.json(resumes)
}
