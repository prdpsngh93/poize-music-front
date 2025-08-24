"use client";
import Image from "next/image";
import Link from "next/link";

export default function NewsSection() {
  const news = [
    {
      id: 1,
      title: "Sustainability in Music Festivals: How We’re Going Green",
      image: "/images/HomePage/newsSectionOne.png",
    },
    {
      id: 2,
      title: "Sustainability in Music Festivals: How We’re Going Green",
      image: "/images/HomePage/newsSectionTwo.png",
    },
    {
      id: 3,
      title: "Sustainability in Music Festivals: How We’re Going Green",
      image: "/images/HomePage/newsSectionThree.png",
    },
  ];

  return (
    <section className="bg-white py-16 px-4 md:px-9 lg:px-12">
      <div className="container mx-auto ">
        <p className="text-[24px] font-semibold uppercase text-gray-800">
          Stay in the know
        </p>
        <h2 className="text-[30px] lg:text-[60px] md:text-5xl font-extrabold mt-2 mb-12 text-gray-900">
          Latest News & Updates
        </h2>

        {/* News cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <div
              key={item.id}
              className="relative rounded-2xl overflow-hidden shadow-lg group h-[400px]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-10 left-6 right-6 text-white">
                <p className="font-anton font-semibold text-[24px] tracking-[0%]  text-center">
                  {item.title}
                </p>
                <button className="px-4 flex hover:cursor-pointer mx-auto py-1 text-[16px] uppercase border mt-[17px] border-white rounded-full text-sm font-bold hover:bg-white hover:text-black transition">
                  Buy Tickets
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-12  flex justify-center">
          <Link
            href="/venue-find-musician"
            className="bg-black text-[18px] uppercase text-white px-[30px] hover:cursor-pointer py-3 rounded-full font-semibold hover:bg-gray-800 transition"
          >
            View More Artists
          </Link>
        </div>
      </div>
    </section>
  );
}
