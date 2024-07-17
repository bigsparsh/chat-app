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

export const createContact = async (
  associated_user_id: string,
  user_id: string,
) => {
  if (!associated_user_id || !user_id) {
    throw new Error("User not found");
  }
  return await prisma.contact.create({
    data: {
      user_id,
      associated_user_id,
    },
    include: {
      user: true,
      associated_user: true,
    },
  });
};
