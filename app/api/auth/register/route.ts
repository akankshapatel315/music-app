import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createUser, getUserByEmail } from "@/lib/db"
import connectDB from "@/lib/mongoDb";

// Define the request schema
const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export async function POST(request: NextRequest) {
  try {
    console.log('inside api');

    await connectDB();

    console.log('inside api');

    const body = await request.json()

    const result = registerSchema.safeParse(body)

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

    const { name, email, password } = result.data

    const existingUser = await getUserByEmail(email);

    console.log('existingUser :>> ', existingUser);

    if (existingUser) {
      return NextResponse.json({ success: false, error: "Email already in use" }, { status: 409 })
    }

    const user = await createUser({ name, email, password });


    return NextResponse.json(
      {
        success: true,
        user: { name: user.name, email: user.email },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)

    // Return error response
    return NextResponse.json({ success: false, error: "An error occurred during registration" }, { status: 500 })
  }
}

