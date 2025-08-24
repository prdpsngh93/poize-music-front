"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const BackButton = ({ route, label = "Back" }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(route)}
      className=" py-2 flex items-center cursor-pointer rounded-lg text-sm font-medium text-black"
    >
     <ChevronLeft/> 
    </button>
  );
};

export default BackButton;
