/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt, { compare } from "bcryptjs";
import User from "@/models/user";


export async function createUser({
  name,
  email,
  password,
}: any) {

  const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });


    
    return {
      name: user?.name,
      email: user?.email,
    };
  
}


export async function getUserByEmail(email: string) {
  return User?.findOne({ email: email });
}


export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}


// Verify a password
export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}
