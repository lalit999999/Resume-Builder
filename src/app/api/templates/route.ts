import { NextResponse } from "next/server"
import { requireUser, UnauthenticatedError } from "@/lib/auth"
import { getActiveTemplates } from "@/lib/resume-queries"

export async function GET() {
  try {
    await requireUser()
  } catch (err) {
    if (err instanceof UnauthenticatedError) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })
    }
    throw err
  }

  const templates = await getActiveTemplates()
  return NextResponse.json(templates)
}
