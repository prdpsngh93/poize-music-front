import React from "react";

const FollowedArtists = () => {
  const artists = [
    { name: "The Luminary Echoes", image: "/images/avatar.png" },
    { name: "Aurora Skies", image: "/images/avatar.png" },
    { name: "Midnight Pulse", image: "/images/avatar.png" },
    { name: "Crimson Tide", image: "/images/avatar.png" },
    { name: "Electric Serenade", image: "/images/avatar.png" },
    { name: "The Velvet Underground", image: "/images/avatar.png" },
    { name: "Neon Dreamscape", image: "/images/avatar.png" },
    { name: "Sapphire Symphony", image: "/images/avatar.png" },
    { name: "Echoing Embers", image: "/images/avatar.png" },
    { name: "Starlight Sonata", image: "/images/avatar.png" },
  ];

  return (
    <div className="w-full sm:w-60 p-4 bg-white rounded-xl shadow-sm">
      <h2 className="text-base font-bold text-[#121417] mb-4">
        Your Followed Artists
      </h2>
      <ul className="space-y-3 text-sm text-[#121417]">
        {artists.map((artist) => (
          <li key={artist.name} className="flex items-center gap-3">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-9 h-9 rounded-full object-cover"
            />
            <span>{artist.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowedArtists;
