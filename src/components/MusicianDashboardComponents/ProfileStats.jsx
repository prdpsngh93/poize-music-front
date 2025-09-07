"use client";

import { useAppContext } from "@/context/AppContext";
import React from "react";

const ProfileStats = () => {
  const { userData,gigsTotalCount } = useAppContext();

  const stats = [
    {
      id: 1,
      value: userData && userData.profile.gigs_completed || 0,
      label: "Gigs Completed",
      bg: "bg-white text-gray-900",
    },
    {
      id: 2,
      value:  userData && userData.profile.collaboration_post_count || 0,
      label: "Collaborations",
      bg: "bg-emerald-500 text-white",
    },
    {
      id: 3,
      value:  userData && userData.profile.requests_sent || 0,
      label: "Request Sent",
      bg: "bg-hite text-gray-900",
    },
    {
      id: 4,
      value: gigsTotalCount || 0,
      label: "Event Gigs Count",
      bg: "bg-emerald-500 text-white",
    },
  ];
  return (
    <div className="bg-[#f4f3ee]">
      <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-6">
        Profile Stats
      </h2>
      <div className="flex flex-wrap gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`w-[45%] md:w-[45%] lg:w-[23.5%] rounded-xl px-4 py-6 text-center shadow-sm ${stat.bg}`}
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;
