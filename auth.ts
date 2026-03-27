import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import prisma from "./lib/prisma";
import { compare } from "bcryptjs";
import { ZodError } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);
          const user = await prisma.user.findUnique({
            where: { email },
          });
          if (!user || !user.password) return null;
          const isPasswordValid = await compare(password, user.password);
          if (!isPasswordValid) return null;
          return {
            id: user.id,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          if (error instanceof ZodError) return null;
          return null;
        }
      },
    }),
    Google,
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await prisma.user.upsert({
          where: { email: user.email! },
          update: {
            name: user.name ?? "",
            image: user.image ?? null,
          },
          create: {
            email: user.email!,
            name: user.name ?? "",
            image: user.image ?? null,
          },
        });
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google") {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email! },
          });
          token.id = dbUser?.id;
        } else {
          token.id = user.id;
        }
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.image = token.image as string;
      return session;
    },
  },
});
