"use client";

import React, { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { ChatContext } from "@/app/context/ChatContext";
import EmptyChatPlaceholder from "./EmptyChatPlaceholder";

const ChatMessageList = () => {
  const { messages, currentUser, selectedArtist } = useContext(ChatContext);
  const messageEndRef = useRef(null);

  console.log("currentUser",currentUser)
  console.log("messages",messages)

  // Scroll to bottom on messages update
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedArtist) {
    return <p className="text-center text-gray-500">Select an artist to start chatting.</p>;
  }

  return (
    <div className="flex flex-col justify-center w-full gap-4 p-4 h-80 overflow-y-auto bg-white rounded shadow">
      {messages.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
                <EmptyChatPlaceholder />
              </div>
      )}
      {messages.map((msg) => {
        const isMe = msg.sender_id === currentUser?.user?.id;
        return (
          <div
            key={msg.id}
            className={`flex ${isMe ? "justify-end" : "justify-start"} items-start`}
          >
            {!isMe && (
              <Image
                src={selectedArtist.avatar || "/images/avatar.png"}
                alt={`${selectedArtist.name} Avatar`}
                width={32}
                height={32}
                className="rounded-full mr-2 mt-1"
              />
            )}
            <div
              className={`max-w-[80%] md:max-w-[60%] p-3 text-sm md:text-base rounded-xl shadow-sm ${
                isMe
                  ? "bg-white text-gray-900 rounded-br-none"
                  : "bg-[#1FB58F] text-white rounded-bl-none"
              }`}
            >
              {msg.content}
              <div className={`text-xs mt-1 opacity-70 ${isMe ? "text-right" : "text-left"}`}>
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {isMe && (msg.is_read ? " ✓✓" : " ✓")}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatMessageList;
