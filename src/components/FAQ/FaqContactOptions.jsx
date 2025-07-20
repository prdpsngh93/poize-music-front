"use client";
import { useState } from "react";

const options = ["Email Us", "Live Chat", "Community Forum"];

const ContactOptions = () => {
  const [selected, setSelected] = useState("Live Chat");

  return (
    <section className="">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
        Contact Us
      </h2>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => {
          const isActive = selected === option;
          return (
            <button
              key={option}
              onClick={() => setSelected(option)}
              className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100 hover:text-emerald-600 hover:border-emerald-600"
                }
              `}
            >
              {option}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ContactOptions;
