"use client";

import { useEffect } from "react";
import { initSocket, getSocket } from "../../../lib/socket";

export default function ChatPage() {
  useEffect(() => {
    const socket = initSocket();

    if (!socket) return;

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("message", (msg) => {
      console.log("New message:", msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Chat Page</h1>
    </div>
  );
}
