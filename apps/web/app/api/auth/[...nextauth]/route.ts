import NextAuth from "next-auth/next";
import bcrpyt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { createUser } from "../../../../actions/user";
import { AuthProvider } from "@prisma/client";

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
        const hashedPassword = await bcrpyt.hash(credentials.password, 10);
        console.log(credentials.email, credentials.password);
        await createUser({
          email: credentials.email,
          password: hashedPassword,
          auth_provider: AuthProvider.CREDENTIALS,
          name: credentials.email.split("@")[0],
        });
        return;
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
  secret: process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };
