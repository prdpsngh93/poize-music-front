'use client';

import Image from 'next/image';
import Navbar from './Navbar';

export default function Footer() {
  return (
    <footer className="bg-[#f3f2ed] relative border-t border-gray-300 pb-10">
      {/* Navbar with black text */}
      <Navbar variant="dark" />

      {/* Footer Grid */}
      <div className="container mx-auto px-4 md:px-9 lg:px-12 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-black">
        {/* Column 1: Main Menu */}
        <div>
          <h3 className="text-lg font-bold mb-4">Main</h3>
          <ul className="space-y-2 text-[16px] font-semibold">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Events</li>
            <li className="cursor-pointer">Shop</li>
            <li className="cursor-pointer">Blog</li>
            <li className="cursor-pointer">Exhibits</li>
            <li className="cursor-pointer">Get Tickets</li>
          </ul>
        </div>

        {/* Column 2: Connect */}
        <div>
          <h3 className="text-lg font-bold mb-4">Connect</h3>
          <ul className="space-y-2 text-[16px] font-semibold">
            <li className="cursor-pointer">Line Up</li>
            <li className="cursor-pointer">Latest News</li>
            <li className="cursor-pointer">Become A Sponsor</li>
            <li className="cursor-pointer">Venue</li>
            <li className="cursor-pointer">Schedule</li>
            <li className="cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Column 3: Socialize */}
        <div>
          <h3 className="text-lg font-bold mb-4">Socialize</h3>
          <ul className="space-y-2 text-[16px] font-semibold">
            <li className="cursor-pointer">Instagram</li>
            <li className="cursor-pointer">Facebook</li>
            <li className="cursor-pointer">YouTube</li>
            <li className="cursor-pointer">Spotify</li>
            <li className="cursor-pointer">Tiktok</li>
          </ul>
        </div>

        {/* Column 4: Image with Overlay */}
        <div className="sm:col-span-2 md:col-span-1 flex justify-center md:justify-end">
          <div className="relative rounded-xl overflow-hidden max-h-[280px] shadow-lg w-full sm:w-[300px] md:w-[320px]">
            <Image
              src="/images/HomePage/footer.png"
              alt="Concert crowd"
              height={280}
              width={520}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <p className="text-white font-bold text-lg text-center">Tune Into Creativity</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
