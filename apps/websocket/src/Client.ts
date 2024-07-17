import { WebSocket } from "ws";

export type ClientType = {
  client_id: string;
  email: string;
  ws: WebSocket;
  connected_to: string | null;
};

export class Client {
  private static instance: Client;
  private client_array: ClientType[];
  private constructor() {
    this.client_array = [];
  }
  static getInstance(): Client {
    if (!Client.instance) {
      Client.instance = new Client();
    }
    return Client.instance;
  }
  addClient(ws: WebSocket) {
    // logic to add the client to the client_array
  }
  removeClient(ws: WebSocket) {
    // logic to remove the client from the client_array
  }
}
