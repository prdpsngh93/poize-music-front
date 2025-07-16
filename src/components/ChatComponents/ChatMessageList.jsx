'use client';

import React from 'react';
import Image from 'next/image';

const ChatMessageList = () => {
  const messages = [
    {
      id: 1,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley.',
      sender: 'other',
      avatar: '/images/avatar.png',
    },
    {
      id: 2,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
      sender: 'me',
    },
  ];

  return (
    <div className="flex flex-col mx-suto justify-center w-full gap-4 p-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} items-start`}
        >
          {msg.sender !== 'me' && (
            <Image
              src={msg.avatar}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full mr-2 mt-1"
            />
          )}

          <div
            className={`max-w-[80%] md:max-w-[60%] p-3 text-sm md:text-base rounded-xl shadow-sm ${
              msg.sender === 'me'
                ? 'bg-white text-gray-900 rounded-br-none'
                : 'bg-[#1FB58F] text-white rounded-bl-none'
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessageList;
