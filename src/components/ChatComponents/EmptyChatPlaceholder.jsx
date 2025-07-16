'use client';

import React from 'react';

const EmptyChatPlaceholder = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-120px)] px-4 bg-[#f4f3ee]">
      <div className="text-center max-w-md">
        <h2 className="text-sm md:text-base font-semibold text-gray-800 mb-2">
          Select a conversation to start chatting
        </h2>
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
          Your messages will appear here. You can search for people<br />
          or venues to start a new conversation.
        </p>
      </div>
    </div>
  );
};

export default EmptyChatPlaceholder;
