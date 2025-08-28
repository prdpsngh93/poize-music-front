"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const BackButton = ({ route, label = "Back" }) => {
  const router = useRouter();

  const handleClick = () => {
    if (route) {
      router.push(route);
    } else {
      router.back();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="py-2 flex items-center cursor-pointer rounded-lg text-sm font-medium text-black"
    >
      <ChevronLeft className="mr-1" />
     
    </button>
  );
};

export default BackButton;
