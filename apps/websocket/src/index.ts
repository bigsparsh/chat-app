import { WebSocketServer } from "ws";
import { Client } from "./Client";
import { z } from "zod";

const wss = new WebSocketServer({ port: 8080 });
const client = Client.getInstance();

const typeSchema = z.object({
  type: z.enum(["message", "connection", "peer connection"]),
});

const stringSchema = z.string();

wss.on("connection", (ws) => {
  client.addClient(ws);

  ws.on("message", (message) => {
    try {
      typeSchema.parse(JSON.parse(message.toString()));
    } catch (e) {
      ws.send("Invalid message type");
      return;
    }

    console.log(`Received message => ${message}`);
    ws.send(`message Received`);
  });

  ws.send("Established connection with websocket server");
});
//askldjk
