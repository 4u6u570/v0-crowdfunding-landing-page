import { neon } from "@neondatabase/serverless"
import { type NextRequest, NextResponse } from "next/server"
import * as bcrypt from "bcryptjs"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email y contraseña son requeridos" }, { status: 400 })
    }

    // Query user from database
    const result = await sql`
      SELECT id, email, password, role FROM users WHERE email = ${email}
    `

    if (result.length === 0) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 401 })
    }

    const user = result[0]

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 })
    }

    // Return user data with role
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ message: "Error al iniciar sesión" }, { status: 500 })
  }
}
