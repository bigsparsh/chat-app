import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { createUser } from "../../../../actions/user";
import { AuthProvider, User } from "@prisma/client";
import prisma from "@repo/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials: { email: string; password: string }) {
        const newUser = await createUser({
          email: credentials.email,
          password: credentials.password,
          auth_provider: AuthProvider.CREDENTIALS,
          name: credentials.email.split("@")[0],
        });
        return newUser;
      },
    }),
    GoogleProvider({
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      name: "Github",
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/auth/signup",
    error: "/auth/signup",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email as string,
          },
        });
        if (existingUser) {
          token.user = existingUser;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    // @ts-ignore
    async signIn({
      user,
      account,
    }: {
      user: {
        name: string;
        email: string;
        image: string;
      };
      account: { provider: "credentials" | "google" | "github" | "login" };
    }) {
      if (account.provider === "credentials" || account.provider === "login") {
        return true;
      }
      if (account.provider === "google") {
        await createUser({
          name: user.name,
          email: user.email,
          profile_img: user.image,
          auth_provider: AuthProvider.GOOGLE,
        });
      }
      if (account.provider === "github") {
        await createUser({
          name: user.name,
          email: user.email,
          profile_img: user.image,
          auth_provider: AuthProvider.GITHUB,
        });
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };
