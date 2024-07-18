import { clientSchema } from "@repo/types/websocket";
import { WebSocket } from "ws";
import z from "zod";

export class Client {
  private static instance: Client;
  private client_array: z.infer<typeof clientSchema>[];
  private constructor() {
    this.client_array = [];
  }
  static getInstance(): Client {
    if (!Client.instance) {
      Client.instance = new Client();
    }
    return Client.instance;
  }
  add(client: z.infer<typeof clientSchema>) {
    clientSchema.parse(client);
    this.client_array.push(client);
  }
  remove(ws: WebSocket) {
    // logic to remove the client from the client_array
  }
  get() {
    return this.client_array;
  }
}