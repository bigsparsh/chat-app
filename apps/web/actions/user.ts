"use server";
import prisma from "@repo/db";
import { userInputSchema } from "@repo/types/user";
import { AuthProvider } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import { getServerSession } from "next-auth";

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
    throw new Error(JSON.stringify(validation.error));
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const hashedPassword = password
    ? await bcrypt.hash(password as string, 10)
    : null;
  if (existingUser) {
    if (
      existingUser.auth_provider === AuthProvider.CREDENTIALS &&
      auth_provider === AuthProvider.CREDENTIALS
    ) {
      return existingUser;
    }
    if (
      (existingUser.auth_provider === AuthProvider.GITHUB &&
        auth_provider === AuthProvider.GITHUB) ||
      (existingUser.auth_provider === AuthProvider.GOOGLE &&
        auth_provider === AuthProvider.GOOGLE)
    ) {
      return await prisma.user.update({
        where: {
          email,
        },
        data: {
          name,
          profile_img,
        },
      });
    }
    if (
      existingUser.auth_provider === AuthProvider.GITHUB &&
      auth_provider === AuthProvider.GOOGLE
    ) {
      throw new Error("User already exists in GitHub");
    }
    if (
      existingUser.auth_provider === AuthProvider.GOOGLE &&
      auth_provider === AuthProvider.GITHUB
    ) {
      throw new Error("User already exists in Google");
    }
  }
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      auth_provider,
      profile_img,
      name: name as string,
      created_at: new Date(),
    },
  });

  return newUser;
};

export const getUsers = async () => {
  const session = await getServerSession();
  if (!session || !session.user) {
    throw new Error("User not found");
  }
  const users = await prisma.user.findMany({
    where: {
      NOT: {
        email: session.user.email as string,
      },
    },
  });

  return users;
};

export const getUserById = async (user_id: string) => {
  if (z.string().uuid().safeParse(user_id).success === false)
    throw new Error("Invalid user id");

  const user = await prisma.user.findUnique({
    where: {
      user_id,
    },
  });

  return user;
};
