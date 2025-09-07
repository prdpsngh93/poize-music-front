"use client";

import Image from "next/image";
import MeetOurArtists from "./MeetOurArtists";
import MeetOurArtistsTwo from "./MeetOurArtistsTwo";

const topArtists = [
  {
    name: "Meet Our Artists",
    role: "CREATORS OF",
    image: "/images/HomePage/artistOne.png", // update with real paths
  },
  {
    name: "Meet Our Artists",
    role: "CREATORS OF",
    image: "/images/HomePage/artistOne.png",
  },
  {
    name: "Meet Our Artists",
    role: "CREATORS OF",
    image: "/images/HomePage/artistOne.png",
  },
  {
    name: "Meet Our Artists",
    role: "CREATORS OF",
    image: "/images/HomePage/artistOne.png",
  },
];

const galleryImages = [
  "/images/HomePage/music1.png",
  "/images/HomePage/music2.png",
  "/images/HomePage/music3.png",
  "/images/HomePage/music4.png",
  "/images/HomePage/music1.png",
  "/images/HomePage/music2.png",
  "/images/HomePage/music3.png",
  "/images/HomePage/music4.png",
];

export default function Artists() {
  return (
    <section className="container mx-auto px-4  md:px-9 lg:px-12   py-8 md:py-16 ">
      <MeetOurArtistsTwo/>

    
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {galleryImages.map((src, i) => (
          <div key={i} className="overflow-hidden rounded-xl w-full h-full md:h-[100%]">
            <Image
              src={src}
              alt={`event-${i}`}
              width={300}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
