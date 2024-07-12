import { AuthProvider } from "@prisma/client";
import z from "zod";

export const userOutputSchema = z.object({
  user_id: z.string().uuid({ message: "Invaild UUID" }),
  name: z
    .string()
    .min(3, { message: "Name must be above 3 characters" })
    .max(20, { message: "Name must be below 20 characters" }),
  email: z.string().email({ message: "The email is invaild" }),
  password: z.string(),
  created_at: z.date(),
  auth_provider: z.nativeEnum(AuthProvider),
  profile_img: z.string().url({ message: "The profile image must be a URL" }),
});

export const contactOutputSchema = z.object({
  contact_id: z.string().uuid({ message: "Invaild contact UUID" }),
  user_id: z.string().uuid({ message: "Invaild user UUID" }),
  associated_user_id: z
    .string()
    .uuid({ message: "Invaild associated user UUID" }),
});

export const messageOutputSchema = z.object({
  message_id: z.string().uuid({ message: "Invaild message UUID" }),
  sender_id: z.string().uuid({ message: "Invaild sender UUID" }),
  receiver_id: z.string().uuid({ message: "Invaild receiver UUID" }),
  message: z.string().min(1, { message: "Message must be above 1 character" }),
  created_at: z.date(),
});

export const userInputSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be above 3 characters" })
    .max(20, { message: "Name must be below 20 characters" }),
  email: z.string().email({ message: "The email is invaild" }),
  password: z.string().optional(),
  created_at: z.date(),
  auth_provider: z.nativeEnum(AuthProvider),
  profile_img: z
    .string()
    .url({ message: "The profile image must be a URL" })
    .optional(),
});

export const contactInputSchema = z.object({
  user_id: z.string().uuid({ message: "Invaild user UUID" }),
  associated_user_id: z
    .string()
    .uuid({ message: "Invaild associated user UUID" }),
});

export const messageInputSchema = z.object({
  sender_id: z.string().uuid({ message: "Invaild sender UUID" }),
  receiver_id: z.string().uuid({ message: "Invaild receiver UUID" }),
  message: z.string().min(1, { message: "Message must be above 1 character" }),
  created_at: z.date(),
});
