"use client";

import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Heart, MessageSquare } from "lucide-react";
import { ChatContext } from "@/app/context/ChatContext";

const ProfileCards = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setSelectedArtist } = useContext(ChatContext);
  const router = useRouter();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const token = localStorage.getItem("token") || ""; // Replace with Cookie approach if needed
        const res = await fetch(
          "http://localhost:5000/api/artists",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch artists");
        }
        const data = await res.json();
        setArtists(data.artists || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  const handleMessageClick = (artist) => {
    console.log("artst", artist);
    setSelectedArtist(artist);
    try {
      localStorage.setItem("selectedArtist", JSON.stringify(artist));
      router.push("/messaging-inbox3-4"); 
    } catch (e) {
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 py-10">Loading artists...</p>
    );

  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center py-10 px-4 bg-[#f3f3ef]">
      {artists.length === 0 && <p>No artists found.</p>}
      {artists.map((artist) => (
        <div
          key={artist.id}
          className="w-full max-w-[240px] flex flex-col gap-4 items-center text-center"
        >
          <div className="w-[160px] h-[160px] relative">
            <Image
              src={artist.avatar || artist.image || "/images/avatar.png"}
              alt={artist.name || "Artist"}
              fill
              className="object-cover rounded-full"
              unoptimized
            />
          </div>

          <div className="w-full flex flex-col items-start justify-start text-left px-2">
            <h3 className="text-[15px] font-semibold text-gray-900">
              {artist.name || "Unknown Artist"}
            </h3>
            <p className="text-[10px] text-gray-600 mt-1 leading-snug">
              {artist.genre || artist.bio?.substring(0, 60) + "..."}
            </p>
          </div>

          <div className="flex justify-center items-center gap-5 mt-1">
            {[
              { icon: <Plus size={18} />, label: "Connect" },
              { icon: <Heart size={18} />, label: "Favourite" },
              {
                icon: <MessageSquare size={18} />,
                label: "Message",
                action: () => handleMessageClick(artist),
              },
            ].map(({ icon, label, action }, idx) => (
              <div
                key={idx}
                onClick={action}
                className="flex flex-col items-center text-[12px] text-gray-600 group cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && action) action();
                }}
                aria-label={`${label} ${artist.name}`}
              >
                <div className="bg-white rounded-full p-2 transition-colors duration-200 group-hover:bg-[#1FB58F] group-hover:text-white">
                  {icon}
                </div>
                <span className="mt-1">{label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => alert(`View details clicked for ${artist.name}`)}
            className="mt-2 bg-[#1FB58F] text-white px-6 py-2 rounded-full text-[14px] font-medium hover:bg-emerald-600 transition"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProfileCards;
