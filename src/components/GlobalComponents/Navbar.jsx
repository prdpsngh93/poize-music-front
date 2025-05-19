'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ['Home', 'Events', 'Shop', 'Blog', 'Work', 'Artists'];
  const rightItems = ['Search', 'Login', 'Cart(0)'];

  return (
    <nav className="w-full  text-white  z-50 font-poppins font-bold text-sm uppercase absolute top-0">
      <div className="max-w-[1620px] w-full h-[120px] mx-auto border-b-[0.5px] flex justify-between items-center px-4 py-4">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
        </div>

        {/* Center: Nav Links */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item}>
              <Link href="#" className="hover:underline">{item}</Link>
            </li>
          ))}
        </ul>

        {/* Right: Search, Login, Cart */}
        <div className="hidden md:flex space-x-4 items-center">
          {rightItems.map((item) => (
            <Link href="#" key={item} className="hover:underline">{item}</Link>
          ))}
          <Image src={'/images/menu.png'} 
          
          alt='menu' width={60} height={55}/>
        </div>

        {/* Mobile Menu Button */}
        {/* <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button> */}
      </div>

      {/* Mobile Menu */}
      {/* {isOpen && (
        <div className="md:hidden bg-black bg-opacity-80 px-4 pb-4">
          {[...navItems, ...rightItems].map((item) => (
            <Link
              key={item}
              href="#"
              className="block py-2 border-b border-gray-700 hover:underline"
            >
              {item}
            </Link>
          ))}
        </div>
      )} */}
    </nav>
  );
}
