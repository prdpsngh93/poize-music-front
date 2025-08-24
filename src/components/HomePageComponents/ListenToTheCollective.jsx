"use client";

import Image from "next/image";
import Link from "next/link";

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
    <section className="px-4 md:px-9 lg:px-12 py-8 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Headings */}
        <p className="uppercase font-bold text-[#222222] text-xl sm:text-2xl mb-2">
          Your Next Favorite Track
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold border-b-2 text-[#222222] border-black pb-4 mb-12 leading-tight">
          Listen to the Collective
        </h2>

        {/* Event Cards */}
        <div className="space-y-16">
          {events.map((event, index) => (
            <div
  key={index}
  className="flex flex-col lg:flex-row lg:border-b-0  border-b items-start justify-between pb-8"
>
              {/* Left Content */}
             <div className="flex flex-col gap-6 pb-[10%] w-full border-b-0  border-gray-700 lg:border-b lg:border-gray-700">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-[20%]  xl:gap-[40%]">
                    <p className="text-[40px] md:text-[50px] xl:text-[60px] font-normal text-[#222222]">
                      {event.date}
                    </p>
                    <p className="text-[24px] md:text-[25px] xl:text-[30px] font-bold text-[#222222]">
                      {event.title}
                    </p>
                  </div>
                  <p className="text-[16px] sm:text-[18px] md:text-[24px] font-bold uppercase tracking-widest text-[#222222]">
                    {event.subtitle}
                  </p>
                  <div className="  w-[50px] md:w-[60px]">
                    <Image
                      src="/images/HomePage/arrow.png"
                      width={60}
                      height={60}
                      alt="arrow"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Right Content - Image */}
              <div className="relative h-[250px] sm:h-[300px] xl:h-[350px] w-full lg:w-[600px] rounded-2xl overflow-hidden group">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute  top-4 left-[30%]  md:left-[40%] lg:left-[30%] text-xs font-bold uppercase tracking-widest px-4 py-2 sm:px-6 sm:py-2 bg-white text-black rounded-full hover:bg-black hover:text-white transition">
                  Buy Tickets
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <Link
          href="/venue-find-musician"
          className="px-6 sm:px-8 py-3 text-sm font-bold uppercase tracking-widest bg-black text-white rounded-full hover:bg-gray-800 transition">
            View More Artists
          </Link>
        </div>
      </div>
    </section>
  );
}
