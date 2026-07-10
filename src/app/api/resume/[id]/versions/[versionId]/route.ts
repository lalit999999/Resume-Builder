import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireUser, UnauthenticatedError } from "@/lib/auth"

type RouteParams = { params: Promise<{ id: string; versionId: string }> }

export async function GET(_request: Request, { params }: RouteParams) {
  let user
  try {
    user = await requireUser()
  } catch (err) {
    if (err instanceof UnauthenticatedError) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })
    }
    throw err
  }

  const { id, versionId } = await params
  const resume = await prisma.resume.findUnique({ where: { id } })
  if (!resume || resume.deletedAt || resume.userId !== user.id) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  }

  const version = await prisma.resumeVersion.findUnique({ where: { id: versionId } })
  if (!version || version.deletedAt || version.resumeId !== id) {
    return NextResponse.json({ error: "Version not found" }, { status: 404 })
  }

  return NextResponse.json(version)
}
