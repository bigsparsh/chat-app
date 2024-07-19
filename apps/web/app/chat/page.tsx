"use client";
import { MessageSquareMore } from "lucide-react";

export default () => {
  return (
    <div className="h-full grid place-items-center bg-accent">
      <div className="flex gap-3">
        <MessageSquareMore size={45} />
        <div className="flex flex-col">
          <p>Select any person from your contacts</p>
          <p>and start interacting now</p>
        </div>
      </div>
    </div>
  );
};
