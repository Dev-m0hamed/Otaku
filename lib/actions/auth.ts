"use server";

import { signIn } from "@/auth";
import prisma from "../prisma";
import { hash } from "bcryptjs";
import type { SignUpParams } from "@/types";

export async function signInWithCredentials({ email, password }: { email: string; password: string }) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      return { success: false, error: result.error };
    }
    return { success: true };
  } catch (error) {
    console.log(error, "Signin error");
    return { success: false, error: "Signin error" };
  }
}

export async function signUp(params: SignUpParams) {
  const { fullName, email, password, avatar } = params;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return { success: false, error: "User already exists" };
  }
  const hashedPassword = await hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
        avatar,
      },
    });
    await signInWithCredentials({ email, password });
    return { success: true };
  } catch (error) {
    console.log(error, "Signup error");
    return { success: false, error: "Signup error" };
  }
}
