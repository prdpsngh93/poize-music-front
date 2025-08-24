"use client";

import Image from "next/image";
import Link from "next/link";

const artists = [
  {
    name: "Meet Our Artists",
    role: "Creators Of",
    image: "/images/HomePage/headphone-girl.jpg",
    width: 385,
    height: 420,
  },
  {
    name: "Meet Our Artists",
    role: "Creators Of",
    image: "/images/HomePage/boy-singer.jpg",
    width: 330,
    height: 420,
  },
  {
    name: "Meet Our Artists",
    role: "Creators Of",
    image: "/images/HomePage/headphone-girl.jpg",
    width: 330,
    height: 420,
  },
  {
    name: "Meet Our Artists",
    role: "Creators Of",
    image: "/images/HomePage/boy-singer.jpg",
    width: 330,
    height: 420,
  },
];

export default function MeetOurArtistsTwo() {
  return (
    <section className="container mx-auto   py-8 md:py-16">
      <div className="mb-10">
        <p className="text-[14px] md:text-[16px] uppercase tracking-wide text-gray-900 font-bold font-anton">
          Creators of Tomorrow’s Sound
        </p>
        <h2 className="text-[32px] md:text-[48px] font-extrabold mt-2 text-gray-900 font-anton">
          Meet Our Artists
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {artists.map((artist, index) => (
          <div
            key={index}
            className="flex flex-col justify-start items-start space-y-2"
          >
            <div className="rounded-xl overflow-hidden w-full">
              <Image
                src={artist.image}
                alt={artist.name}
                width={artist.width}
                height={artist.height}
                className="object-cover w-full h-auto rounded-xl"
              />
            </div>
            <p className="text-[10px] uppercase text-gray-500 font-semibold font-anton">
              {artist.role}
            </p>
            <h3 className="text-[14px] md:text-[16px] text-[#222222] font-bold font-anton">
              {artist.name}
            </h3>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          href="/venue-find-musician"
          className="px-8 py-3 text-sm md:text-base font-bold font-anton uppercase bg-black text-white rounded-full hover:opacity-80 transition"
        >
          View More Artists
        </Link>
      </div>
    </section>
  );
}
