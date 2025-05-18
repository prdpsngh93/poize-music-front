"use client";

import Image from "next/image";
import { ArrowDownLeft, ArrowDownRight } from "lucide-react";

const events = [
  {
    date: "10/18",
    title: "DJ Sapphire + Guests",
    subtitle: "YOUR NEXT FAVORITE TRACK",
    image: "/images/HomePage/artistOne.png",
  },
  {
    date: "10/18",
    title: "DJ Sapphire + Guests",
    subtitle: "YOUR NEXT FAVORITE TRACK",
    image: "/images/HomePage/artistTwo.png",
  },
  {
    date: "10/18",
    title: "DJ Sapphire + Guests",
    subtitle: "YOUR NEXT FAVORITE TRACK",
    image: "/images/HomePage/artistThree.png",
  },
];

export default function ListenToTheCollective() {
  return (
    <section className=" mx-auto px-4 py-16 bg-white">
      <div className=" container mx-auto">
        <p className="uppercase font-bold text-[24px] mb-2">
          Your Next Favorite Track
        </p>
        <h2 className="text-[60px] font-bold border-b-2 border-black pb-4 mb-12">
          Listen to the Collective
        </h2>

        <div className="space-y-16">
          {events.map((event, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row items-start justify-between border-b pb-8 gap-8"
            >
              {/* Left Section */}
              <div className="flex flex-col   gap-12 w-full ">
                <div className="flex flex-col ">
                  <div className="flex   max-w-[900px] w-full items-center  justify-between">
                    <p className="text-[60px] font-[400] min-w-[80px]">{event.date}</p>
                    <p className="text-[36px] font-bold pl-9">{event.title}</p>
                  </div>
                  <p className="text-[24px] font-[700] uppercase tracking-widest pb-4">
                    {event.subtitle}
                  </p>
                  <Image src={"/images/HomePage/arrow.png"} width={90} height={90} alt="arrow" />
                </div>
              </div>

              {/* Right Section - Image */}
              <div className="relative h-[400px] w-full lg:w-[600px] rounded-xl overflow-hidden group">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-4 right-4 text-xs font-bold uppercase tracking-widest px-6 py-2 bg-white text-black rounded-full hover:bg-black hover:text-white transition">
                  BUY TICKETS
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More Artists Button */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 text-sm font-bold uppercase tracking-widest bg-black text-white rounded-full hover:bg-gray-800 transition">
            View More Artists
          </button>
        </div>
      </div>
    </section>
  );
}