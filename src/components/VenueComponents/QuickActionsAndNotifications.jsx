"use client";
import { Bell } from "lucide-react";
import React from "react";

const notifications = [
  {
    title: "New Request",
    message: "New booking request from Sophia Green",
  },
  {
    title: "Gig Confirmed",
    message: "Your gig with The Twilight Harmonies is confirmed",
  },
];

const QuickActionsAndNotifications = () => {
  return (
    <div className="w-full py-6 rounded-md">
      {/* Quick Actions */}
      <div className="flex flex-wrap md:flex-nowrap justify-start md:justify-between items-center gap-3 mb-6">
        <div className="flex flex-col flex-wrap gap-3">
          <button className="px-4 py-1.5 bg-[#3F77F6] text-white rounded-full text-sm font-medium">
            Post Gig
          </button>
          <button className="px-4 py-1.5 text-black bg-white  border-none text-sm font-medium rounded-full">
            Edit Profile
          </button>
        </div>
        <button className="bg-[#1BBF81] text-white text-sm font-medium px-5 py-2 rounded-full">
          Browse Artists
        </button>
      </div>

      {/* Notifications */}
      <div>
        <h3 className="text-sm font-semibold text-[#121417] mb-4">Notifications</h3>
        <div className="flex flex-col gap-4">
          {notifications.map((notification, index) => (
            <div key={index} className="flex items-start gap-3">
              <Bell className="w-4 h-4 mt-1 text-black" />
              <div className="text-sm">
                <p className="font-medium text-[#121417]">{notification.title}</p>
                <p className="text-[#5E6470]">{notification.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionsAndNotifications;
