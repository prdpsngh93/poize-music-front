"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { authAPI } from "../../../lib/api";
import Cookies from "js-cookie";
import { useAppContext } from "@/context/AppContext";

export default function NavbarMusician({ variant = "light", isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const isLight = variant === "light";

  const { userData, setUserData } = useAppContext();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, []);

  const handleLogout = () => {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });

    if (typeof window !== "undefined") {
      window.location.replace("/login");
    }
  };

  const fetchUserProfile = async () => {
    try {
      const result = await authAPI.getApi();

      if (result.user) {
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

  // ✅ Compute dashboard link
  const dashboardLink = useMemo(() => {
    if (!userData || !userData.user?.role) return "/role";

    switch (userData.user.role) {
      case "contributor":
      case "producer":
        return "/contributor-profile";
      case "music_lover":
        return "/music-lover-profile";
      case "artist":
        return "/musician-profile";
      case "venue":
        return "/venue-profile-form";
      default:
        return "/";
    }
  }, [userData]);

  // ✅ Default nav (for guests)
  const defaultNavItems = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/event-booking" },
    { label: "Shop", href: "/shop" },
    { label: "Blog", href: "/blogs" },
    { label: "Work", href: "/work" },
    { label: "Artists", href: "/venue-find-musician" },
  ];

  // ✅ Role-based nav items
  const contributorNav = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/event-booking" },
    { label: "Dashboard", href: "/contributor-dashboard" },
    { label: "Blog", href: "/blogs" },
    { label: "Manage Gigs", href: "/manage-created-gigs" },
    { label: "Create Gig", href: "/create-gig" },
    { label: "Artists", href: "/venue-find-musician" },
  ];

  const venueNav = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/event-booking" },
    { label: "Dashboard", href: "/venue-dashboard" },
    { label: "Blog", href: "/blogs" },
    { label: "Create Gig", href: "/venue-post-gig" },
    { label: "Artists", href: "/venue-find-musician" },
  ];

  const artistNav = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/event-booking" },
    { label: "Dashboard", href: "/musician-dashboard" },
    { label: "Blog", href: "/blogs" },
    { label: "Find Gigs", href: "/find-gigs" },
    { label: "Collaborate", href: "/find-artist-to-collab" },
  ];

  const musicLoverNav = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/event-booking" },
    { label: "Blog", href: "/blogs" },
    { label: "Dashboard", href: "/music-lover-dashboard" },
    { label: "Gigs", href: "/music-lover-browse-gigs" },
    { label: "Artists", href: "/venue-find-musician" },
  ];

  // ✅ Pick correct nav items
  const roleBasedNavItems = useMemo(() => {
    const role = userData?.user?.role;

    switch (role) {
      case "contributor":
      case "producer":
        return contributorNav;
      case "venue":
        return venueNav;
      case "artist":
        return artistNav;
      case "music_lover":
        return musicLoverNav;
      default:
        return defaultNavItems;
    }
  }, [userData]);

  return (
    <div
      className="relative h-[120px] bg-cover bg-top"
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

            {/* Desktop Nav */}
            <ul className="hidden md:flex space-x-6">
              {roleBasedNavItems.map((item) => (
                <li key={item.label} className="group flex flex-col items-center">
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                  <span className="w-3 h-[2px] bg-white mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </li>
              ))}
            </ul>

            {/* Desktop Right - Profile + Logout */}
            <div className="hidden md:flex gap-6 items-center">
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="hover:underline uppercase cursor-pointer"
                >
                  Logout
                </button>
              )}
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
          <div className="md:hidden bg-white/90 px-6 py-4 space-y-4 text-black z-50">
            {roleBasedNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block border-b border-gray-300 py-2 hover:underline"
              >
                {item.label}
              </Link>
            ))}
            {isLoggedIn && (
              <>
                <Link
                  href={dashboardLink}
                  className="block border-b border-gray-300 py-2 hover:underline"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block border-b uppercase cursor-pointer border-gray-300 py-2 hover:underline"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
