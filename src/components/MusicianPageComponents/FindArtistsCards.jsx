'use client';

import React from 'react';
import Image from 'next/image';
import { Plus, Heart, MessageSquare } from 'lucide-react';

const artists = [
  {
    id: 1,
    name: 'Ava Harper',
    genre: 'Indie Pop, Guitar',
    image: '/images/avatar.png',
  },
  {
    id: 2,
    name: 'Ethan Carter',
    genre: 'Electronic, Synth',
    image: '/images/avatar.png',
  },
  {
    id: 3,
    name: 'Olivia Bennett',
    genre: 'R&B, Vocals',
    image: '/images/avatar.png',
  },
  {
    id: 4,
    name: 'Noah Thompson',
    genre: 'Rock, Drums',
    image: '/images/avatar.png',
  },
  {
    id: 5,
    name: 'Sophia Clark',
    genre: 'Classical, Piano',
    image: '/images/avatar.png',
  },
  {
    id: 6,
    name: 'Liam Walker',
    genre: 'Hip Hop, DJ',
    image: '/images/avatar.png',
  },
];

const FindArtistsCards = () => {
  return (


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1  justify-items-center">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className=" w-full max-w-[250px] rounded-xl flex flex-col gap-3 items-center p-4"
          >
            <div className="w-[100px] h-[100px] relative mb-3">
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className='flex flex-col justify-center items-center gap-1'>
            <h3 className="text-sm font-semibold text-gray-800">{artist.name}</h3>
            <p className="text-sm text-gray-500 mb-3 text-center">{artist.genre}</p>
            </div>
            <div className="flex justify-center space-x-2 ">
              <div className="flex flex-col items-center gap-1 text-[10px] text-gray-500">
                <div className='bg-white rounded-full p-1'>
                <Plus size={20}  />
                </div>
                <span>Connect</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[10px] text-gray-500">
              <div className='bg-white rounded-full p-1'>
                <Heart size={19} className='bg-white rounded-full ' />
                </div>
                <span>Favourite</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[10px] text-gray-500">
              <div className='bg-white rounded-full p-1'>
                <MessageSquare size={19} className='bg-white rounded-full ' />
                </div>
                <span>Message</span>
              </div>
            </div>

            <button className=" bg-emerald-500 text-white px-4 py-1 rounded-full text-sm hover:bg-emerald-600 transition">
              View Profile
            </button>
          </div>
        ))}
      </div>
  );
};

export default FindArtistsCards;
