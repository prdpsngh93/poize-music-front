"use client";

import { ArrowUpRight } from "lucide-react";

export default function StayInTheLoop() {
  return (
    <section className="w-full bg-[#F1F0EB] px-4 md:px-9 lg:px-12 py-12 md:py-24">
      <div className="relative h-auto min-h-[500px] container mx-auto bg-[url('/images/bg-image.png')] bg-cover bg-center rounded-xl text-white text-center flex flex-col items-center justify-center px-4 py-12 sm:py-16 md:py-20 overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#00000073] rounded-xl z-0"></div>

        {/* Content */}
        <div className="relative z-10 w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins mb-4 leading-tight">
            Stay in the Loop
          </h2>
          <p className="max-w-[700px] w-full mx-auto text-base sm:text-lg md:text-[17px] font-light leading-relaxed mb-10">
            Sign up for exclusive updates on new releases, upcoming events, and special offers.
            Don’t miss out on all the exciting things happening in our music collective!
          </p>

          <form className="flex  items-center justify-center border-b border-white gap-4 max-w-2xl w-full mx-auto px-2">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full text-base sm:text-lg md:text-2xl px-4 py-3 bg-transparent  text-white  font-semibold focus:outline-none"
            />
            <button
              type="submit"
              className="text-white hover:opacity-80 transition mt-2 sm:mt-0"
              aria-label="Submit Email"
            >
              <ArrowUpRight size={40} className="sm:size-[48px] md:size-[50px]" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
