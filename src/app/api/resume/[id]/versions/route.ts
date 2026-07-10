import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireUser, UnauthenticatedError } from "@/lib/auth"

type RouteParams = { params: Promise<{ id: string }> }

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

  const { id } = await params
  const resume = await prisma.resume.findUnique({ where: { id } })
  if (!resume || resume.deletedAt || resume.userId !== user.id) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  }

  const versions = await prisma.resumeVersion.findMany({
    where: { resumeId: id, deletedAt: null },
    orderBy: { versionNum: "desc" },
  })

  return NextResponse.json(versions)
}
