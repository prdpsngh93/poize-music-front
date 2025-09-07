"use client";

import Image from "next/image";
import { Plus, Heart, MessageSquare } from "lucide-react";
import Link from "next/link";
import NavbarMusician from "@/components/MusicianPageComponents/NavbarMusician";
import Navbar from "@/components/GlobalComponents/Navbar";
import NavbarChat from "@/components/ChatComponents/NavbarChat";

const artists = [
  {
    image: "/images/HomePage/artistOne.png",
    name: "Melow Muse",
    genre: "Electro Pop",
    description:
      "Electropop artist known for dreamy synth melodies, hypnotic beats, and introspective lyrics.",
  },
  {
    image: "/images/HomePage/artistTwo.png",
    name: "Ella Nova",
    genre: "Indie Pop",
    description: "Known for her ethereal tone and vivid storytelling.",
  },
  {
    image: "/images/HomePage/artistThree.png",
    name: "Black Horizon",
    genre: "Metal",
    description:
      "Hard-hitting band with a powerful live presence and aggressive sound.",
  },
  {
    image: "/images/HomePage/artistOne.png",
    name: "Melow Muse",
    genre: "Electro Pop",
    description:
      "Electropop artist known for dreamy synth melodies, hypnotic beats, and introspective lyrics.",
  },
  {
    image: "/images/HomePage/artistTwo.png",
    name: "Ella Nova",
    genre: "Indie Pop",
    description: "Known for her ethereal tone and vivid storytelling.",
  },
  {
    image: "/images/HomePage/artistThree.png",
    name: "Black Horizon",
    genre: "Metal",
    description:
      "Hard-hitting band with a powerful live presence and aggressive sound.",
  },
];

const ArtistsGrid = () => {
  return (
    <>
    <NavbarChat/>
    <div className="py-12 px-4  sm:px-6 lg:px-8 bg-[#f3f3ef]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
        {artists.map((artist, index) => (
          <div
            key={index}
            className="w-full max-w-[240px] flex flex-col gap-4 items-center text-center"
          >
            {/* Artist Avatar */}
            <div className="w-[160px] h-[160px] relative">
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="object-cover rounded-full"
                unoptimized
              />
            </div>

            {/* Artist Info */}
            <div className="w-full flex flex-col items-start justify-start text-left px-2">
              <h3 className="text-[15px] font-semibold text-gray-900">
                {artist.name}
              </h3>
              <p className="text-[10px] text-gray-600 mt-1 leading-snug">
                {artist.genre || artist.description?.substring(0, 60) + "..."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-5 mt-1">
              {[
                { icon: <Plus size={18} />, label: "Connect" },
                { icon: <Heart size={18} />, label: "Favourite" },
                {
                  icon: <MessageSquare size={18} />,
                  label: "Message",
                  action: () => alert(`Message clicked: ${artist.name}`),
                },
              ].map(({ icon, label, action }, idx) => (
                <div
                  key={idx}
                  onClick={action}
                  className="flex flex-col items-center text-[12px] text-gray-600 group cursor-pointer"
                >
                  <div className="bg-white rounded-full p-2 transition-colors duration-200 group-hover:bg-[#1FB58F] group-hover:text-white">
                    {icon}
                  </div>
                  <span className="mt-1">{label}</span>
                </div>
              ))}
            </div>

            {/* View Details */}
            <Link
          href="/messaging-inbox2"
              className="mt-2 bg-[#1FB58F] text-white px-6 py-2 rounded-full text-[14px] font-medium hover:bg-emerald-600 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Load More */}
      {/* <div className="flex justify-center mt-10">
        <button className="px-6 py-2 border rounded-full font-medium hover:bg-black hover:text-white transition-all duration-300">
          Load More
        </button>
      </div> */}
    </div>
    </>
  );
};

export default ArtistsGrid;
