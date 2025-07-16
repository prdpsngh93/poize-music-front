'use client';

import React from 'react';
import Image from 'next/image';

const tracks = [
  {
    id: 1,
    song: 'Lorem ipsum is simply dummy text',
    artist: 'Lorem Ipsum is simply (dummy text)',
    album: 'Lorem Ipsum is simply (dummy text)',
    duration: '04:25',
    image: '/images/avatar.png',
  },
  {
    id: 2,
    song: 'Lorem ipsum is simply dummy text',
    artist: 'Lorem Ipsum is simply (dummy text)',
    album: 'Lorem Ipsum is simply (dummy text)',
    duration: '04:25',
    image: '/images/avatar.png',
  },
   {
    id: 3,
    song: 'Lorem ipsum is simply dummy text',
    artist: 'Lorem Ipsum is simply (dummy text)',
    album: 'Lorem Ipsum is simply (dummy text)',
    duration: '04:25',
    image: '/images/avatar.png',
  },
  {
    id: 4,
    song: 'Lorem ipsum is simply dummy text',
    artist: 'Lorem Ipsum is simply (dummy text)',
    album: 'Lorem Ipsum is simply (dummy text)',
    duration: '04:25',
    image: '/images/avatar.png',
  },
   {
    id: 5,
    song: 'Lorem ipsum is simply dummy text',
    artist: 'Lorem Ipsum is simply (dummy text)',
    album: 'Lorem Ipsum is simply (dummy text)',
    duration: '04:25',
    image: '/images/avatar.png',
  },
   {
    id: 6,
    song: 'Lorem ipsum is simply dummy text',
    artist: 'Lorem Ipsum is simply (dummy text)',
    album: 'Lorem Ipsum is simply (dummy text)',
    duration: '04:25',
    image: '/images/avatar.png',
  },
  
];

const PopularTracks = () => {
  return (
    <div className="bg-[#F1F0EA] w-full py-10 px-4 sm:px-6 md:px-10 lg:px-16 flex justify-center">
      <div className="w-full max-w-7xl">
        <h3 className="text-[16px] md:text-[18px] font-bold text-[#1B3139] mb-6">
          Popular Tracks
        </h3>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm text-[#1B3139]">
            <thead>
              <tr className="text-[12px] md:text-[13px] font-medium text-gray-600 border-b border-gray-300">
                <th className="py-3 px-2 w-[40%]">Songs</th>
                <th className="py-3 px-2 w-[20%]">Artist</th>
                <th className="py-3 px-2 w-[25%]">Album</th>
                <th className="py-3 px-2 w-[15%] text-right">Duration</th>
              </tr>
            </thead>

            <tbody>
              {tracks.map((track) => (
                <tr
                  key={track.id}
                  className="border-b border-gray-200 hover:bg-[#E9E8E1] transition"
                >
                  <td className="py-4 px-4 flex items-center gap-3">
                    <div className="w-10 h-10 relative rounded-full overflow-hidden shrink-0">
                      <Image
                        src={track.image}
                        alt={track.song}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[13px] font-semibold">{track.song}</span>
                  </td>
                  <td className="py-4 px-2 text-[13px] text-gray-600">
                    {track.artist}
                  </td>
                  <td className="py-4 px-2 text-[13px] text-gray-600">
                    {track.album}
                  </td>
                  <td className="py-4 px-2 text-[13px] text-right font-semibold text-black">
                    {track.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PopularTracks;
