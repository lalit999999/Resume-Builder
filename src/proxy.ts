import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

/**
 * Route protection for authenticated resources lives per-layout/page via
 * `auth.protect()` (see src/app/(dashboard)/layout.tsx) — `createRouteMatcher`-based
 * blanket protection here is deprecated by Clerk in favor of resource-based checks.
 * This proxy only handles the cross-cutting redirect for already-signed-in users
 * hitting the auth pages.
 */
const isAuthRoute = (pathname: string) =>
  pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")

export default clerkMiddleware(async (auth, req) => {
  if (!isAuthRoute(req.nextUrl.pathname)) return

  const { userId } = await auth()

  if (userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }
})

export const config = {
  // clerkMiddleware must still run on every route (except static assets) so that
  // `auth()` / `auth.protect()` calls in layouts and pages have request state to
  // read — only the redirect logic above is scoped to specific paths.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/(api|trpc)(.*)",
  ],
}
