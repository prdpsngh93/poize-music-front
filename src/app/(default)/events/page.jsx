import React from "react";
import Link from "next/link";

const events = [
  {
    title: "DJ Sapphire + Guests",
    image: "/images/HomePage/music1.png",
  },
  {
    title: "Velvet Pulse + Guests",
     image: "/images/HomePage/music2.png",
  },
  {
    title: "Sonic Drift + Binacles",
    image: "/images/HomePage/music3.png",
  },
  {
    title: "Mellow Muse + Le Cadre Noir",
      image: "/images/HomePage/music4.png",
  },
  {
    title: "Aurora Fade",
    image: "/images/HomePage/music2.png",
  },
  {
    title: "Echo Nova + Distances",
     image: "/images/HomePage/music1.png",
  },
];

const EventCard = ({ title, image }) => (
  <div className="relative overflow-hidden rounded-2xl shadow-md group">
    <img src={image} alt={title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-4 flex justify-between items-center">
      <h3 className="text-lg font-semibold truncate max-w-[70%]">{title}</h3>
      <button className="bg-white text-black text-sm font-medium px-3 py-1 rounded hover:bg-gray-200 transition">Buy Tickets</button>
    </div>
  </div>
);

const Breadcrumb = () => (
  <nav className="text-sm text-gray-500 mb-4">
    <ol className="list-reset flex">
      <li>
        <Link href="/" className="hover:underline">Home</Link>
      </li>
      <li><span className="mx-2">/</span></li>
      <li className="text-gray-700">Events</li>
    </ol>
  </nav>
);

const EventsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb />
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <EventCard key={index} title={event.title} image={event.image} />
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="bg-black text-white text-sm font-medium px-6 py-2 rounded hover:bg-gray-800 transition">View More Events</button>
      </div>
    </div>
  );
};

export default EventsPage;
