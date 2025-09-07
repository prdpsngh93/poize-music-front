'use client';

import React from 'react';
import Image from 'next/image';
import { Paperclip, Share2, MoreHorizontal } from 'lucide-react';

const UserHeaderBar = () => {
  return (
    <div className="bg-[#EDEDE7] px-6 py-6 rounded-md flex flex-col sm:flex-row items-start sm:items-center  justify-between w-full max-w-6xl mx-auto gap-3 sm:gap-0">
      
      {/* Left: Avatar and Name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 relative rounded-full overflow-hidden shrink-0">
          <Image
            src="/images/avatar.png"
            alt="Alex Turner"
            fill
            className="object-cover"
          />
        </div>
        <span className="font-semibold text-sm text-[#000] whitespace-nowrap">Alex Turner</span>
      </div>

      {/* Right: Icon Buttons */}
      <div className="flex items-center gap-2 self-start sm:self-auto">
        <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition">
          <Paperclip size={16} className="text-black" />
        </button>
        <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition">
          <Share2 size={16} className="text-black" />
        </button>
        <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition">
          <MoreHorizontal size={16} className="text-black" />
        </button>
      </div>
    </div>
  );
};

export default UserHeaderBar;
