import { neon } from "@neondatabase/serverless"
import { type NextRequest, NextResponse } from "next/server"
import * as bcrypt from "bcryptjs"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { email, password, role = "user" } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email y contraseña son requeridos" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      return NextResponse.json({ message: "El usuario ya existe" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const result = await sql`
      INSERT INTO users (email, password, role) 
      VALUES (${email}, ${hashedPassword}, ${role})
      RETURNING id, email, role
    `

    return NextResponse.json(
      {
        success: true,
        user: result[0],
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Register error:", error)
    return NextResponse.json({ message: "Error al registrar usuario" }, { status: 500 })
  }
}
