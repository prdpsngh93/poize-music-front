"use client";

import React, { useContext, useState } from "react";
import { ChatContext } from "@/app/context/ChatContext";

const ChatInput = () => {
  const { selectedArtist, sendMessage } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!selectedArtist) return null;

  const handleSend = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    try {
      await sendMessage(message.trim());
      setMessage("");
    } catch (err) {
      console.error("Send message failed:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-[#f4f3ee]">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
          {/* Input */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${selectedArtist.name}`}
            className="flex-1 resize-none outline-none bg-transparent text-sm md:text-base placeholder-gray-400 rounded-md p-2"
            rows={2}
            disabled={isSending}
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={isSending || !message.trim()}
            className={`ml-2 bg-[#1FB58F] text-white text-xs md:text-sm font-medium px-4 py-1.5 rounded-full hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
