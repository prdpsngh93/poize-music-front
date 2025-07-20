"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react"; // Icon for dropdown

const TopQuestions = ({ questionList }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full  mx-auto mt-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Top Questions</h2>

      <div className="space-y-3">
        {questionList.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full flex justify-between items-center px-4 py-3 font-medium bg-white text-gray-800 hover:bg-gray-50 transition"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === index && (
              <div className="px-4 py-2 text-sm text-gray-600 bg-gray-50">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopQuestions;
