import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import { z } from "zod"

// Define the session schema
const sessionSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  iat: z.number().optional(),
  exp: z.number().optional(),
})

export type Session = z.infer<typeof sessionSchema>

// Get the JWT secret from environment variables
const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_for_development_only")

// Create a session and store it in a cookie
export async function createSession(session: Omit<Session, "iat" | "exp">) {
  // Create a JWT token
  const token = await new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h") // Token expires in 8 hours
    .sign(secret)

  // Store the token in a cookie
  ;(await
    // Store the token in a cookie
    cookies()).set({
    name: "session",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8, // 8 hours in seconds
    sameSite: "lax",
  })
}

// Get the session from the cookie
export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get("session")?.value

  if (!token) {
    return null
  }

  try {
    // Verify the token
    const { payload } = await jwtVerify(token, secret)

    // Validate the session data
    const result = sessionSchema.safeParse(payload)

    if (!result.success) {
      return null
    }

    return result.data
  } catch  {
    // If the token is invalid or expired, return null
    return null
  }
}

