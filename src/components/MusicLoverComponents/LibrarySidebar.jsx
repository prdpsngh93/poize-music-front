import React from "react";
import {
  Heart,
  ListMusic,
  User,
  Disc,
  Mic2,
} from "lucide-react";

const items = [
  { label: "Liked Songs", icon: <Heart size={18} /> },
  { label: "Playlists", icon: <ListMusic size={18} /> },
  { label: "Artists", icon: <User size={18} /> },
  { label: "Albums", icon: <Disc size={18} /> },
  { label: "Podcasts & Shows", icon: <Mic2 size={18} /> },
];

const LibrarySidebar = () => {
  return (
    <div className="w-full sm:w-60  ">
      <h2 className="text-lg font-semibold mb-4 text-black">Your Library</h2>
      <ul className="space-y-2 text-sm p-4 rounded-lg shadow-sm  bg-white text-gray-700">
        {items.map(({ label, icon }) => (
          <li
            key={label}
            className="flex items-center  gap-3 cursor-pointer hover:font-semibold"
          >
            <div className="p-1 bg-gray-100 rounded-md">{icon}</div>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LibrarySidebar;
