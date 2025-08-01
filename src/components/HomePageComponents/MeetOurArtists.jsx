"use client";

import Image from "next/image";

const artists = [
  {
    name: "Meet Our Artists",
    role: "CREATORS OF",
    image: "/images/HomePage/artistOne.png", // replace with your actual image paths
  },
  {
    name: "Meet Our Artists",
    role: "CREATORS OF",
    image: "/images/HomePage/artistTwo.png",
  },
  {
    name: "Meet Our Artists",
    role: "CREATORS OF",
    image: "/images/HomePage/artistThree.png",
  },
];

export default function MeetOurArtists() {
  return (
    <section className="container mx-auto px-4 md:px-9 lg:px-12 max-w-7xl  py-4 md:py-16">
      <div className="mb-8">
        <p className="text-[24px] text-[#222222] font-bold font-anton tracking-wide uppercase">
          Creators of Tomorrow’s Sound
        </p>
        <h2 className="text-[40px] lg:text-[60px] md:text-5xl font-extrabold mt-2 mb-12 text-[#222222]">
          Meet Our Artists
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 justify-center items-start mb-10">
        {artists.map((artist, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="overflow-hidden rounded-xl w-full  group h-[320px]">
              <Image
                src={artist.image}
                alt={artist.name}
                width={500}
                height={200}
                className="w-full  h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-4 text-left w-full px-2">
              <h3 className="text-[16px] text-[#222222] font-bold font-anton">
                {artist.name}
              </h3>
              <p className="text-[12px] font-bold text-gray-700 uppercase mt-1">
                {artist.role}
              </p>
            </div>
            <button className="mt-4 px-4 py-1 text-[12px] font-bold font-anton uppercase bg-black text-white rounded-full hover:opacity-80 transition">
              Buy Tickets
            </button>
          </div>
        ))}
      </div>

      <button className="px-[30px] s flex justify-center mx-auto   py-3 text-[18px] font-bold font-anton uppercase bg-black text-white rounded-full hover:opacity-80 transition">
        View More Artists 
      </button>
    </section>
  );
}
