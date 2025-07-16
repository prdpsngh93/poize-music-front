    'use client';

import React, { useState } from 'react';

const ChatInput = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    console.log('Sent:', message); // Replace with your send logic
    setMessage('');
  };

  return (
    <div className=" bg-[#f4f3ee]">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
          {/* Input */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="flex-1 outline-none bg-transparent text-sm md:text-base placeholder-gray-400"
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            className="ml-2 bg-[#1FB58F] text-white text-xs md:text-sm font-medium px-4 py-1.5 rounded-full hover:bg-teal-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
