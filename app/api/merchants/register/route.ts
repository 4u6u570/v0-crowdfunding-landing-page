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

  await sql("UPDATE merchants SET session_token = $1, last_login = NOW() WHERE id = $2", [sessionToken, userId])
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Datos incompletos" }, { status: 400 })
    }

    // Check if merchant already exists
    const existing = await sql("SELECT id FROM merchants WHERE contact_email = $1", [email.toLowerCase()])

    if (existing.length > 0) {
      return NextResponse.json({ message: "El email ya está registrado" }, { status: 400 })
    }

    // Hash password
    const passwordHash = hashPassword(password)

    // Create merchant
    const result = await sql(
      `INSERT INTO merchants (name, contact_email, password_hash, contact_phone, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING id, contact_email`,
      [name, email.toLowerCase(), passwordHash, phone || null, "active"],
    )

    if (result.length === 0) {
      return NextResponse.json({ message: "Error al crear cuenta" }, { status: 500 })
    }

    const merchant = result[0]

    // Create session and auto-login
    await createSession(merchant.id, merchant.contact_email, "merchant")

    return NextResponse.json({
      message: "Cuenta creada exitosamente",
      redirect: "/merchant/dashboard",
    })
  } catch (error) {
    console.error("[v0] Merchant register error:", error)
    return NextResponse.json({ message: "Error del servidor" }, { status: 500 })
  }
}
