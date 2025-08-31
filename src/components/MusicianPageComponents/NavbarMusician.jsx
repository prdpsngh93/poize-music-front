"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { authAPI } from "../../../lib/api";
import Cookies from "js-cookie";
import { useAppContext } from "@/context/AppContext";

export default function NavbarMusician({ variant = "light" }) {
  const [isOpen, setIsOpen] = useState(false);
  const isLight = variant === "light";

  const [profileImage, setProfileImage] = useState("");
  const { userData, setUserData } = useAppContext();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const result = await authAPI.getApi();

      if (result.user) {
        // Map API response to form data
        setProfileImage(
          result.user?.profile_image || result?.profile?.profile_picture || ""
        );
        Cookies.set("gig_completed", result.profile?.gigs_completed);
        setUserData(result);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  // Get user data from cookie

  let dashboardLink = "/";

  if (userData) {
    switch (userData.user.role) {
      case null:
        dashboardLink = "/role";
        break;
      case "contributor":
      case "producer":
        dashboardLink = "/contributor-profile";
        break;
      case "music_lover":
        dashboardLink = "/music-lover-profile";
        break;
      case "artist":
        dashboardLink = "/musician-profile";
        break;
      case "venue":
        dashboardLink = "/venue-profile-form";
        break;
      default:
        dashboardLink = "/";
    }
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/event-booking" },
    { label: "Shop", href: "/shop" },
    { label: "Blog", href: "/blog" },
    { label: "Work", href: "/work" },
    { label: "Artists", href: "/venue-find-musician" },
  ];

  return (
    <div
      className="relative h-[120px] bg-cover bg-top "
      style={{
        backgroundImage: "url('/images/banner.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <nav
        className={`w-full z-50 font-roboto font-normal lg:font-bold text-sm uppercase ${
          isLight ? "text-white absolute top-0 left-0" : "text-black"
        }`}
      >
        <div className="max-w-[1620px] w-full mx-auto px-4 md:px-9 lg:px-12 relative z-10">
          <div
            className={`flex border-b-[0.5px] ${
              isLight ? "border-[#7A7A7A]" : "border-gray-400"
            } justify-between items-center py-4`}
          >
            {/* Logo */}
            <Link className="flex items-center space-x-2" href={"/"}>
              <Image
                src={"/images/logo.png"}
                alt="Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className="group flex flex-col items-center"
                >
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                  <span className="w-3 h-[2px] bg-white mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </li>
              ))}
            </ul>

            {/* Desktop Right Side - Only Profile Image */}
            <div className="hidden md:flex items-center">
              <Link href={dashboardLink}>
                <Image
                  src={profileImage || "/images/avatar.png"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full h-8 w-8 object-cover cursor-pointer"
                />
              </Link>
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
                key={item.label}
                href={item.href}
                className="block border-b border-gray-300 py-2 hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}
