"use server";
import prisma from "@repo/db";
import { userInputSchema } from "@repo/types/user";
import { AuthProvider } from "@prisma/client";

export const createUser = async ({
  name,
  email,
  password,
  auth_provider,
  profile_img,
}: {
  name?: string;
  email: string;
  password?: string;
  profile_img?: string;
  auth_provider: AuthProvider;
}) => {
  const user = {
    name,
    email,
    password,
    auth_provider,
    profile_img,
    created_at: new Date(),
  };
  const validation = userInputSchema.safeParse(user);
  if (!validation.success) {
    throw new Error("Invaild credentials provided");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    switch (existingUser.auth_provider) {
      case AuthProvider.CREDENTIALS:
        throw new Error("User already exists with email credentials");
      case AuthProvider.GOOGLE:
        throw new Error("User already exists with Google");
      case AuthProvider.GITHUB:
        throw new Error("User already exists with Github");
    }
  }
  const newUser = await prisma.user.create({
    data: {
      email,
      password,
      auth_provider,
      profile_img,
      name,
      created_at: new Date(),
    },
  });

  return newUser;
};
