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
    <div className="bg-[#F1F0EA] px-4 md:px-9 lg:px-16 py-8 w-full overflow-x-auto">
      <h3 className="text-[15px] md:text-[16px] font-bold text-[#1B3139] mb-4">
        Popular Tracks
      </h3>

      <table className="min-w-full table-fixed text-left text-[13px] md:text-[14px] text-[#1B3139]">
        <thead className="border-b border-gray-300">
          <tr className="text-[11px] text-gray-500 font-medium">
            <th className="py-2 px-2 w-[40%]">Songs</th>
            <th className="py-2 px-2 w-[20%]">Artist</th>
            <th className="py-2 px-2 w-[25%]">Album</th>
            <th className="py-2 px-2 w-[15%] text-right">Duration</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track) => (
            <tr
              key={track.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="py-3 px-2 flex items-center gap-3">
                <div className="w-10 h-10 relative rounded-full overflow-hidden">
                  <Image
                    src={track.image}
                    alt={track.song}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-[13px] font-semibold">
                  {track.song}
                </span>
              </td>
              <td className="py-3 px-2 text-[13px] text-gray-600">
                {track.artist}
              </td>
              <td className="py-3 px-2 text-[13px] text-gray-600">
                {track.album}
              </td>
              <td className="py-3 px-2 text-[13px] text-right font-semibold text-black">
                {track.duration}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PopularTracks;
