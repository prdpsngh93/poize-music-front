"use client";

import { ArrowUpRight } from "lucide-react";

export default function StayInTheLoop() {
  return (
    <section className="w-full bg-[#F1F0EB] px-4 py-16">
      <div
        className="rounded-xl bg-black h-[500px] container mx-auto bg-center text-white text-center flex flex-col items-center justify-center px-4"
      >
        <h2 className="text-[60px] font-bold font-poppins mb-4">Stay in the Loop</h2>
        <p className="max-w-[700px] w-full mx-auto text-[17px] font-light leading-relaxed mb-10">
          Sign up for exclusive updates on new releases, upcoming events, and special offers.
          Don’t miss out on all the exciting things happening in our music collective!
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl w-full px-4">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full text-[36px] px-4 py-2 bg-transparent border-b border-white text-white placeholder-white font-semibold focus:outline-none"
          />
          <button
            type="submit"
            className="text-white hover:opacity-80 transition"
            aria-label="Submit Email"
          >
            <ArrowUpRight size={50} />
          </button>
        </form>
      </div>
    </section>
  );
}
