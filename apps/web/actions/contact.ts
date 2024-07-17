"use server";

import prisma from "@repo/db";
import { getServerSession } from "next-auth";

export const getContacts = async () => {
  const session = await getServerSession();
  if (!session || !session.user) {
    throw new Error("User not found");
  }
  return await prisma.contact.findMany({
    where: {
      user: {
        email: session.user.email as string,
      },
    },
    include: {
      user: true,
      associated_user: true,
    },
  });
};

export const createContact = async (user_id: string) => {
  const session = await getServerSession();
  if (!session || !session.user) {
    throw new Error("User not found");
  }
  const loggedInUser = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });
  return await prisma.contact.create({
    data: {
      user_id: loggedInUser?.user_id as string,
      associated_user_id: user_id,
    },
    include: {
      user: true,
      associated_user: true,
    },
  });
};
