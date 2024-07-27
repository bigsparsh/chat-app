import { createClient } from "redis";
import prisma from "@repo/db";

const client = createClient();

const processRequest = async (data: string) => {
  try {
    const message = JSON.parse(data);
    console.log(message);
    switch (message.operation) {
      case "insert":
        await prisma.message.create({
          data: {
            sender_id: message.sender_id,
            receiver_id: message.receiver_id,
            message: message.payload.message,
          },
        });
        break;
    }
  } catch (err) {
    console.error("Include a valid JSON only");
  }
};
const startWorker = async () => {
  try {
    await client.connect();
    console.log("Worker is now connected to Redis server!");
    while (true) {
      try {
        const data = await client.brPop("messages", 0);
        data
          ? processRequest(data.element)
          : console.error("No data to process");
      } catch (err) {
        console.log("Error processing data: ", err);
      }
    }
  } catch (err) {
    console.error("Error connecting to Redis server: ", err);
  }
};
startWorker();
