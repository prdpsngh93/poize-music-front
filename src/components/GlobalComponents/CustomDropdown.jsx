import React, { useState } from 'react';

const Dropdown = ({ label = "Sort By", options = [], onSelect }) => {
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className="relative inline-block px-[11px] rounded-[10px] py-[8px] bg-[#1FB58F] text-left">
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex justify-between items-center w-full font-medium rounded-md focus:outline-none">
          <span className="pr-[35px] font-normal text-[16px] leading-[20px] tracking-[0] text-[#FFFFFF]">{label}</span>
          <span className="font-semibold text-[16px] leading-[20px] tracking-[0] text-[#FFFFFF] ">{selected}</span>
          <svg
            className="ml-2 h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.5 7l4.5 4.5L14.5 7h-9z" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-100"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
