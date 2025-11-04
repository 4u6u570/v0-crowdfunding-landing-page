import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { createHmac } from "crypto"
import { cookies } from "next/headers"

const sql = neon(process.env.DATABASE_URL!)

function hashPassword(password: string): string {
  return createHmac("sha256", process.env.SESSION_SECRET || "default-secret")
    .update(password)
    .digest("hex")
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

async function createSession(userId: number, email: string, role: "admin" | "merchant") {
  const sessionToken = createHmac("sha256", process.env.SESSION_SECRET || "default-secret")
    .update(`${userId}-${email}-${Date.now()}`)
    .digest("hex")

  const cookieStore = await cookies()
  cookieStore.set(`${role}_session`, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 12, // 12 hours
  })

  // Store session in DB for validation
  if (role === "admin") {
    await sql("UPDATE admins SET session_token = $1, last_login = NOW() WHERE id = $2", [sessionToken, userId])
  } else {
    await sql("UPDATE merchants SET session_token = $1, last_login = NOW() WHERE id = $2", [sessionToken, userId])
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email y contraseña requeridos" }, { status: 400 })
    }

    // Find admin
    const admins = await sql("SELECT id, email, password_hash FROM admins WHERE email = $1 AND is_active = true", [
      email.toLowerCase(),
    ])

    if (admins.length === 0) {
      return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 })
    }

    const admin = admins[0]

    // Verify password
    if (!verifyPassword(password, admin.password_hash)) {
      return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 })
    }

    // Create session
    await createSession(admin.id, admin.email, "admin")

    return NextResponse.json({
      message: "Sesión iniciada",
      redirect: "/admin/dashboard",
    })
  } catch (error) {
    console.error("[v0] Admin login error:", error)
    return NextResponse.json({ message: "Error del servidor" }, { status: 500 })
  }
}
