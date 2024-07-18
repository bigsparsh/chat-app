import { WebSocketServer } from "ws";
import { Client } from "./Client";
import {
  connectionSchema,
  messageSchema,
  typeSchema,
} from "@repo/types/websocket";

const wss = new WebSocketServer({ port: 8080 });
const client = Client.getInstance();

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    try {
      typeSchema.parse(JSON.parse(message.toString()));
    } catch (e) {
      ws.send("Invalid message type");
      return;
    }

    const data = JSON.parse(message.toString());

    switch (data.type) {
      case "connection":
        const connectionValidate = connectionSchema.safeParse(data);

        if (!connectionValidate.success) {
          ws.send(
            JSON.stringify({
              type: "error",
              message: connectionValidate.error?.issues[0]?.message as string,
            }),
          );
          return;
        }

        client.add({
          client_id: connectionValidate.data.payload.user_id,
          email: connectionValidate.data.payload.email,
          ws,
          connected_to: connectionValidate.data.payload.connected_to,
        });

        break;
      case "message":
        const messageValidate = messageSchema.safeParse(data);

        if (!messageValidate.success) {
          ws.send(
            JSON.stringify({
              type: "error",
              message: messageValidate.error?.issues[0]?.message as string,
            }),
          );
          return;
        }

        const receiver = client
          .get()
          .find(
            (client) => client.client_id === messageValidate.data.receiver_id,
          );

        if (!receiver) {
          // TODO: add the logic to make this a unread message for the reciever
          ws.send("The reciever user isn't online");
          return;
        }

        receiver.ws.send(
          JSON.stringify({
            type: "message",
            sender_id: messageValidate.data.sender_id,
            payload: messageValidate.data.payload,
          }),
        );

        break;

      case "peer connection":
        break;
    }
  });

  ws.send("Established connection with websocket server");
});
//askldjk
