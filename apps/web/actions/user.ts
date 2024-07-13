"use server";
import prisma from "@repo/db";
import { userInputSchema } from "@repo/types/user";
import { AuthProvider } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import { signIn } from "next-auth/react";

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
  const hashedPassword = password
    ? await bcrypt.hash(password as string, 10)
    : null;
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

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const formSchema = z.object({
    email: z.string().email({ message: "The email format is not correct" }),
    password: z
      .string()
      .min(6, { message: "The password must be at least 6 characters long" })
      .max(20, {
        message: "The password must be at most 20 characters long",
      }),
  });
  const validation = formSchema.safeParse({ email, password });

  if (!validation.success) {
    throw new Error(JSON.stringify(validation.error));
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  switch (user.auth_provider) {
    case AuthProvider.GOOGLE:
      throw new Error("User already exists with Google");
    case AuthProvider.GITHUB:
      throw new Error("User already exists with Github");
  }
  const isCorrectPassword = await bcrypt.compare(
    password,
    user.password as string,
  );
  if (isCorrectPassword) {
    await signIn("credentials", {
      email,
      password,
    });
    return;
  }
  throw new Error("Incorrect password");
};
