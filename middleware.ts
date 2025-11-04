import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

async function getSession(request: NextRequest, role: "admin" | "merchant") {
  const sessionToken = request.cookies.get(`${role}_session`)?.value

  if (!sessionToken) return null

  try {
    const table = role === "admin" ? "admins" : "merchants"
    const result = await sql(`SELECT id, email FROM ${table} WHERE session_token = $1 AND is_active = true`, [
      sessionToken,
    ])

    return result.length > 0 ? result[0] : null
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next()
    }

    const adminSession = await getSession(request, "admin")
    if (!adminSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // Protect merchant routes
  if (pathname.startsWith("/merchant")) {
    if (pathname === "/merchant/login") {
      return NextResponse.next()
    }

    const merchantSession = await getSession(request, "merchant")
    if (!merchantSession) {
      return NextResponse.redirect(new URL("/merchant/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/merchant/:path*"],
}
