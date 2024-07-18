import { z } from "zod";

export const connectionSchema = z.object({
  type: z.literal("connection"),
  payload: z.object(
    {
      user_id: z
        .string({ message: "The user_id must be a string" })
        .uuid({ message: "The user_id must be a valid UUID" }),
      email: z
        .string({ message: "The email must be a string" })
        .email({ message: "The email must be a valid email" }),
      connected_to: z
        .string({ message: "The connected_to must be a string" })
        .uuid({ message: "The connected_to must be a valid UUID" })
        .optional(),
    },
    { message: "The payload must be an object" },
  ),
});

export const typeSchema = z.object({
  type: z.enum(["message", "connection", "peer connection"]),
});

export const clientSchema = z.object({
  ws: z.any(),
  client_id: z
    .string({ message: "The user_id must be a string" })
    .uuid({ message: "The user_id must be a valid UUID" }),
  email: z
    .string({ message: "The email must be a string" })
    .email({ message: "The email must be a valid email" }),
  connected_to: z
    .string({ message: "The connected_to must be a string" })
    .uuid({ message: "The connected_to must be a valid UUID" })
    .optional(),
});

export const messageSchema = z.object({
  type: z.literal("message"),
  sender_id: z
    .string({ message: "The sender_id must be a string" })
    .uuid({ message: "The sender_id must be a valid UUID" }),
  receiver_id: z
    .string({ message: "The receiver_id must be a string" })
    .uuid({ message: "The receiver_id must be a valid UUID" }),
  payload: z.object(
    {
      message: z.string({ message: "The message must be a string" }),
    },
    { message: "The payload must be an object with a message key" },
  ),
});
