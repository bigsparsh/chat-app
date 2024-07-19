import { AuthProvider } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      user_id: string;
      profile_img: string | null;
      name: string;
      password: string | null;
      email: string;
      created_at: Date;
      auth_provider: AuthProvider;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user: {
      user_id: string;
      profile_img: string | null;
      name: string;
      password: string | null;
      email: string;
      created_at: Date;
      auth_provider: AuthProvider;
    };
  }
}
