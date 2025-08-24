"use client";

import React, { useContext } from "react";
import NavbarChat from "@/components/ChatComponents/NavbarChat";
import EmptyChatPlaceholder from "@/components/ChatComponents/EmptyChatPlaceholder";
import ChatMessageList from "@/components/ChatComponents/ChatMessageList";
import ChatInput from "@/components/ChatComponents/ChatInput";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatProvider,ChatContext } from "@/app/context/ChatContext";

const ChatPage = () => {
  const router = useRouter();

  // Consume context to get selectedArtist and loading
  const { selectedArtist, loading } = useContext(ChatContext);


  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading chat...
      </div>
    );
  }

  return (
    <>
      <NavbarChat />

      {/* Wrapper */}
      <div className="bg-[#f4f3ee] px-4 py-8 md:px-9 md:py-16 min-h-screen flex justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-6">

          {/* Back Button */}
          <div className="py-2">
            <button
              onClick={() => router.back()}
              className="flex items-center text-sm font-bold text-gray-700 hover:underline"
            >
              <ArrowLeft size={16} className="mr-1 font-bold" />
              Back
            </button>
          </div>

          {/* User Header */}

          {/* Chat Content */}
          {!selectedArtist ? (
            <EmptyChatPlaceholder />
          ) : (
            <>
              <ChatMessageList />
              <ChatInput />
            </>
          )}
        </div>
      </div>
    </>
  );
};

const PageWrapper = () => (
  <ChatProvider>
    <ChatPage />
  </ChatProvider>
);

export default PageWrapper;
