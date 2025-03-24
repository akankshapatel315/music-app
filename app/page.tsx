import LoginForm from "@/components/auth/login-form";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}
const Page = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter your credentials to access your account</p>
        </div>
        <LoginForm />
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Page;
