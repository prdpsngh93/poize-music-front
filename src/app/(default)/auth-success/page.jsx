"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function AuthSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const profileId = searchParams.get("profileId");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const role = searchParams.get("role");

  useEffect(() => {
    if (token && userId && name && email) {
      Cookies.set("token", token);
      Cookies.set("userId", userId);
      if (profileId) Cookies.set("id", profileId);
      Cookies.set("id", userId);
      Cookies.set("userName", name);
      Cookies.set("userEmail", email);
      if (role) Cookies.set("userRole", role);

      let redirectTo = "/";

      if (!role || role === "null") {
        redirectTo = "/role";
      } else if (["contributor", "producer"].includes(role)) {
        redirectTo = "/contributor-dashboard";
      } else if (role === "music_lover") {
        redirectTo = "/music-lover-profile";
      } else if (role === "artist") {
        redirectTo = "/musician-profile";
      } else if (role === "venue") {
        redirectTo = "/venue-dashboard";
      }

      setTimeout(() => {
        router.replace(redirectTo);
      }, 700);
    }
  }, [token, userId, profileId, name, email, role, router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex flex-col items-center animate-fade-in">
        {/* Elegant Spinner */}
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-300 dark:border-gray-700 border-t-blue-500"></div>
        <p className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-200">
          Setting up your account...
        </p>
      </div>
    </div>
  );
}
