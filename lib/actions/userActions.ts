/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"
import {  getUserByEmail, hashPassword, verifyPassword } from "@/lib/db"
import { createSession } from "@/lib/auth"
import connectDB from "../mongoDb"
import User from "@/models/user"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function login(formData: z.infer<typeof loginSchema>) {
  try {
    // Validate input
    const validatedFields = loginSchema.safeParse(formData)

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Invalid email or password format",
      }
    }

    const { email, password } = validatedFields.data

    // Check if user exists
    const user = await getUserByEmail(email)

    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      }
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      return {
        success: false,
        error: "Invalid email or password",
      }
    }

    // Create session
    await createSession({
      id: user.id,
      name: user.name,
      email: user.email,
    })

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      error: "An error occurred during login",
    }
  }
}

export async function register(formData: z.infer<typeof registerSchema>) {
  try {
    await connectDB();
    const validatedFields = registerSchema.safeParse(formData)

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Invalid registration data",
      }
    }

    const { name, email, password } = validatedFields.data


    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return {
        success: false,
        error: "Email already in use",
      }
    }
    const hashedPassword = await hashPassword(password);

     await User.create({
      name:name, 
      email:email,
      password:hashedPassword
  })


    return { success: true }

  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      error: "An error occurred during registration",
    }
  }
}

export async function logout() {
  (await cookies()).delete("session")
  redirect("/")
}

