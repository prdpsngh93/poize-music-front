'use client';

import React from 'react';
import Image from 'next/image';
import { Plus, Heart, MessageSquare } from 'lucide-react';

const artists = [
  {
    id: 1,
    name: 'Ava Harper',
    genre: 'Hey, are you still looking for a venue for your upcoming tour?',
    image: '/images/avatar.png',
  },
  {
    id: 2,
    name: 'Ethan Carter',
    genre: 'Hey, are you still looking for a venue for your upcoming tour?',
    image: '/images/avatar.png',
  },
  {
    id: 3,
    name: 'Olivia Bennett',
    genre: 'Hey, are you still looking for a venue for your upcoming tour?',
    image: '/images/avatar.png',
  },
  {
    id: 4,
    name: 'Noah Thompson',
    genre: 'Hey, are you still looking for a venue for your upcoming tour?',
    image: '/images/avatar.png',
  },
  {
    id: 5,
    name: 'Sophia Clark',
    genre: 'Hey, are you still looking for a venue for your upcoming tour?',
    image: '/images/avatar.png',
  },
];

const ProfileCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center py-10 px-4 bg-[#f3f3ef]">
      {artists.map((artist) => (
        <div
          key={artist.id}
          className="w-full max-w-[240px] flex flex-col gap-4 items-center text-center"
        >
          {/* Avatar */}
          <div className="w-[160px] h-[160px] relative">
            <Image
              src={artist.image}
              alt={artist.name}
              fill
              className="object-cover rounded-full"
            />
          </div>

          {/* Name and Genre (Left-Aligned) */}
          <div className="w-full flex flex-col items-start justify-start text-left px-2">
            <h3 className="text-[15px] font-semibold text-gray-900">{artist.name}</h3>
            <p className="text-[10px] text-gray-600 mt-1 leading-snug">{artist.genre}</p>
          </div>

          {/* Action Icons */}
          <div className="flex justify-center items-center gap-5 mt-1">
            {[
              { icon: <Plus size={18} />, label: 'Connect' },
              { icon: <Heart size={18} />, label: 'Favourite' },
              { icon: <MessageSquare size={18} />, label: 'Message' },
            ].map(({ icon, label }, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-[12px] text-gray-600 group"
              >
                <div className="bg-white rounded-full p-2 transition-colors duration-200 group-hover:bg-[#1FB58F] group-hover:text-white">
                  {icon}
                </div>
                <span className="mt-1">{label}</span>
              </div>
            ))}
          </div>

          {/* View Button */}
          <button className="mt-2 bg-[#1FB58F] text-white px-6 py-2 rounded-full text-[14px] font-medium hover:bg-emerald-600 transition">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProfileCards;
