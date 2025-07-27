'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const ApplicationCard = ({ applicant }) => {
  const [activeButton, setActiveButton] = useState('');

  const handleClick = (buttonName) => {
    setActiveButton((prev) => (prev === buttonName ? '' : buttonName));
  };

  const isActive = (buttonName) => activeButton === buttonName;

  return (
    <div className="bg-[#f4f3ee]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 md:py-6 bg-[#f4f3ee]">
        {/* Left Text Content */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">Applicant</p>
          <h3 className="text-lg font-semibold text-gray-900">{applicant.name}</h3>
          <p className="text-sm text-gray-700">{applicant.role}</p>

          <div className="mt-2">
            <button className="bg-[#1FB58F] text-white text-sm font-medium px-4 py-1.5 rounded-full hover:bg-green-200 transition">
              View Profile
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {['Accept', 'Reject', 'Shortlist', 'Message'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleClick(btn)}
                className={`text-sm font-medium px-4 py-1.5 rounded-full transition
                  ${isActive(btn)
                    ? 'bg-blue-600 text-white'
                    : btn === 'Accept'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : btn === 'Reject'
                    ? 'bg-gray-200 text-black hover:bg-gray-300'
                    : 'bg-[#E3DFCB] text-black hover:bg-[#d6d3be]'}
                `}
              >
                {btn}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Rating: {applicant.rating} · Note: “{applicant.note}”
          </p>
        </div>

        {/* Applicant Image */}
        <div className="mt-4 w-full flex itens-end justify-end md:mt-0 md:ml-6">
          <Image
            src={applicant.image}
            alt={applicant.name}
            width={250}
            height={200}
            className="rounded-lg w-full md:w-[50%] lg:w-[40%] md:[h-20%] object-cover"
          />
        </div>
      </div>

      {/* Bottom Divider */}
      <hr className="border-t border-gray-300" />
    </div>
  );
};

export default ApplicationCard;
