"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";

export default function Navbar({ variant = "light", isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);


  const isLight = variant === "light";
  const navItems = ["Home", "Events", "Shop", "Blog", "Work", "Artists"];

  const handleLogout = async () => {
    Cookies.remove("token");
    window.location.replace("/login");
  };

  return (
    <nav
      className={`w-full z-50 font-roboto font-normal lg:font-bold text-sm uppercase ${
        isLight ? "text-white absolute top-0 left-0" : "text-black"
      }`}
    >
      <div className="max-w-[1620px] w-full mx-auto px-4 md:px-9 lg:px-12">
        <div
          className={`flex border-b-[0.5px] ${
            isLight ? "border-[#7A7A7A]" : "border-gray-400"
          } justify-between items-center py-4`}
        >
          {/* Logo */}
          <div className="flex-shrink-0 w-15 lg:w-20">
            <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <li key={item}>
                <Link href="/" className="hover:underline">
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Right */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/search" className="hover:underline">
              Search
            </Link>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="hover:underline uppercase cursor-pointer">
                Logout
              </button>
            ) : (
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            )}
            <Link href="/cart" className="hover:underline">
              Cart(0)
            </Link>

            <Image
              src={isLight ? "/images/menu.png" : "/images/menu2.png"}
              alt="menu"
              width={30}
              height={30}
            />
          </div>

          {/* Mobile Toggle */}
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
        <div className="md:hidden bg-white/90 px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item}
              href="#"
              className="block border-b border-gray-300 py-2 text-black hover:underline"
            >
              {item}
            </Link>
          ))}
          <Link
            href="/search"
            className="block border-b border-gray-300 py-2 text-black hover:underline"
          >
            Search
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block border-b uppercase cursor-pointer border-gray-300 py-2 text-black hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="block border-b border-gray-300 py-2 text-black hover:underline"
            >
              Login
            </Link>
          )}
          <Link
            href="/cart"
            className="block border-b border-gray-300 py-2 text-black hover:underline"
          >
            Cart(0)
          </Link>
        </div>
      )}
    </nav>
  );
}
