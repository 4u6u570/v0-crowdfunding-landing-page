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
    maxAge: 60 * 60 * 12,
  })

  if (role === "merchant") {
    await sql("UPDATE merchants SET session_token = $1, last_login = NOW() WHERE id = $2", [sessionToken, userId])
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email y contraseña requeridos" }, { status: 400 })
    }

    // Find merchant
    const merchants = await sql(
      "SELECT id, contact_email, password_hash FROM merchants WHERE contact_email = $1 AND status = $2",
      [email.toLowerCase(), "active"],
    )

    if (merchants.length === 0) {
      return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 })
    }

    const merchant = merchants[0]

    // Verify password
    if (!verifyPassword(password, merchant.password_hash)) {
      return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 })
    }

    // Create session
    await createSession(merchant.id, merchant.contact_email, "merchant")

    return NextResponse.json({
      message: "Sesión iniciada",
      redirect: "/merchant/dashboard",
    })
  } catch (error) {
    console.error("[v0] Merchant login error:", error)
    return NextResponse.json({ message: "Error del servidor" }, { status: 500 })
  }
}
