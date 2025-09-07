"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";

export default function Navbar({ variant = "light", isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  const isLight = variant === "light";

  // ✅ Role → Dashboard Mapping
  const roleDashboards = {
    artist: "/musician-dashboard",
    music_lover: "/music-lover-dashboard",
    contributor: "/contributor-dashboard",
    venue: "/venue-dashboard",
  };

  // ✅ Default nav (for guests)
  const defaultNavItems = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/event-booking" },
    { label: "Shop", href: "/shop" },
    { label: "Blog", href: "/blogs" },
    { label: "Work", href: "/work" },
    { label: "Artists", href: "/venue-find-musician" },
  ];

  // ✅ Role-specific nav items
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
    { label: "Artists", href: "/find-artist-to-collab" },
  ];

  const musicLoverNav = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/event-booking" },
    { label: "Blog", href: "/blogs" },
    { label: "Dashboard", href: "/music-lover-dashboard" },
    { label: "Gigs", href: "/music-lover-browse-gigs" },
    { label: "Artists", href: "/venue-find-musician" },
  ];

  // ✅ Get user data from cookies
  const userDataCookie = Cookies.get("userData");
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null;

  // ✅ Compute dashboard link
  const dashboardHref = useMemo(() => {
    if (userData?.role && roleDashboards[userData.role]) {
      return roleDashboards[userData.role];
    }
    return "/login";
  }, [userData]);

  // ✅ Compute nav items based on role
  const roleBasedNavItems = useMemo(() => {
    if (!userData?.role) return defaultNavItems;

    switch (userData.role) {
      case "contributor":
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

  // ✅ Logout handler
  const handleLogout = () => {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });

    if (typeof window !== "undefined") {
      window.location.replace("/login");
    }
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
          <Link href="/" className="flex-shrink-0 w-15 lg:w-20">
            <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-6">
            {roleBasedNavItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Right Section */}
          <div className="hidden md:flex space-x-4 items-center">
            {isLoggedIn ? (
              // <Link href={dashboardHref} className="hover:underline">
              //   Dashboard
              // </Link>
              <div>                </div>
            ) : (
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            )}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="hover:underline uppercase cursor-pointer"
              >
                Logout
              </button>
            )}
            <Link href="/cart" className="hover:underline">
              Cart(0)
            </Link>
          </div>

          {/* Mobile Toggle Button */}
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
          {roleBasedNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block border-b border-gray-300 py-2 text-black hover:underline"
            >
              {item.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <Link
              href={dashboardHref}
              className="block border-b border-gray-300 py-2 text-black hover:underline"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="block border-b border-gray-300 py-2 text-black hover:underline"
            >
              Login
            </Link>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="block border-b uppercase cursor-pointer border-gray-300 py-2 text-black hover:underline"
            >
              Logout
            </button>
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
