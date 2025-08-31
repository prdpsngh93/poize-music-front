"use client";

import ChatInput from "@/components/ChatComponents/ChatInput";
import EmptyChatPlaceholder from "@/components/ChatComponents/EmptyChatPlaceholder";
import NavbarChat from "@/components/ChatComponents/NavbarChat";
import UserHeaderBar from "@/components/ChatComponents/UserHeaderBar ";
import ChatMessageList from "@/components/ChatComponents/ChatMessageList";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import React, { useContext } from "react";
import { ChatContext, ChatProvider } from "@/app/context/ChatContext";

const page = () => {
  const router = useRouter();


  return (
    <>
      <ChatProvider>
        <NavbarChat />

        {/* Wrapper that centers all content */}
        <div className="bg-[#f4f3ee] px-4 py-8 md:px-9 md:py-16">
          <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
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
            {/* <UserHeaderBar /> */}

            {/* Chat Messages */}
            <ChatMessageList />

            {/* Chat Input */}
            <ChatInput />
          </div>
        </div>
      </ChatProvider>
    </>
  );
};

export default page;
