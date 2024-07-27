"use server";

import prisma from "@repo/db";
import { getServerSession } from "next-auth";

export const getMessages = async (receiver_id: string) => {
  const session = await getServerSession();
  const messages = await prisma.message.findMany({
    where: {
      sender_id: session?.user.user_id,
      receiver_id,
    },
  });
  return messages;
};
