"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import Link from "next/link";
import { BellIcon } from "@heroicons/react/24/solid";  // Imported Heroicons for filled bell

export default function NavbarChat({ variant = "light" }) {
  const [isOpen, setIsOpen] = useState(false);
  const isLight = variant === "light";

  const navItems = ["Home", "About", "Services", "Contact"]; // Example nav items

  return (
    <div
      className="relative h-[300px] bg-cover bg-top"
      style={{
        backgroundImage: "url('/images/banner.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <nav
        className={`w-full z-50 font-roboto font-normal lg:font-bold text-sm uppercase ${
          isLight ? "text-white absolute top-0 left-0" : "text-black"
        }`}
      >
        <div className="max-w-[1620px] w-full mx-auto px-4 md:px-9 lg:px-16 relative z-10">
          <div
            className={`flex border-b-[0.5px] ${
              isLight ? "border-[#7A7A7A]" : "border-gray-400"
            } justify-between items-center py-4`}
          >
            {/* Logo */}
          <Link className="flex items-center space-x-2" href={'/'}>
              <Image
                src={"/images/logo.png"}
                alt="Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </Link>

            {/* Desktop Right Side */}
            <div className="hidden md:flex space-x-4 items-center">
              <Search className="w-5 h-5 cursor-pointer" strokeWidth={2.5} />
              <BellIcon className="w-5 h-5 text-white cursor-pointer" />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={`md:hidden ${isLight ? "text-white" : "text-black"}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white/90 px-6 py-4 space-y-4 text-black z-50">
            {navItems.map((item) => (
              <Link
                key={item}
                href="#"
                className="block border-b border-gray-300 py-2 hover:underline"
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}
