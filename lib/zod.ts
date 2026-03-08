import { z } from "zod";

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const signUpSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  fullName: z.string().min(2).max(50).nonempty('Name is required'),
  avatar: z.string().optional(),
});