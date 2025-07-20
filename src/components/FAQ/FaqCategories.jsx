"use client";

import { CiMicrophoneOn } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

import { CiCreditCard1 } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";



const categories = [
  {
    icon: <CiMicrophoneOn size={26} />,
    title: "Artist Help",
    desc: "Learn how to manage your artist profile",
  },
  {
    icon: <CiUser  size={26} />,
    title: "Account & Payments",
    desc: "Manage your account and payment methods",
  },
  {
    icon: <CiCreditCard1 size={26} />,
    title: "Booking Support",
    desc: "Get help with booking artists",
  },
  {
    icon: <CiCalendarDate size={26} />,
    title: "Technical Support",
    desc: "Troubleshooting technical issues",
  },
  {
    icon: <CiSettings size={26} />,
    title: "General Questions",
    desc: "Find answers to common questions",
  },
];

const FaqCategories = () => {
  return (
    <section className="">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
        Browse by Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-260 rounded-lg p-4 hover:shadow-md transition text-left flex flex-col gap-2"
          >
            <div className=" text-gray-800">
              {cat.icon}
            </div>
            <h3 className=" text-md text-black">{cat.title}</h3>
            <p className="text-xs text-gray-600 text-left">{cat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqCategories;
