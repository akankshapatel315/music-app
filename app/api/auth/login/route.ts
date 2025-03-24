import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getUserByEmail, verifyPassword } from "@/lib/db"
import { createSession } from "@/lib/auth"

// Define the request schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate the request body
    const result = loginSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: result.error.format(),
        },
        { status: 400 },
      )
    }

    const { email, password } = result.data

    const user = await getUserByEmail(email);

  console.log('user :>> ', user);
    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 })
    }

    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 })
    }

    await createSession({
      id: user.id,
      name: user.name,
      email: user.email,
    })

    return NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    })
  } catch (error) {
    console.error("Login error:", error)

    // Return error response
    return NextResponse.json({ success: false, error: "An error occurred during login" }, { status: 500 })
  }
}

