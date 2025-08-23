"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ label = "Back", className = "" }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`flex items-center justify-center gap-2 w-full max-w-[100px] px-5 py-3 cursor-pointer bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition ${className}`}
    >
      <ArrowLeft className="w-5 h-5" />
      {label}
    </button>
  );
};

export default BackButton;
