import React from 'react';

const FilterSidebar = ({ title, fields }) => {
  return (
    <aside className="bg-[#F1F0EA] py-10 px-4 md:px-[18px] rounded-[10px] shadow w-full max-w-full md:max-w-full max-h-[845px]">
      <div>
        <h2 className="font-bold text-xl md:text-2xl leading-[30px] pl-2 md:pl-5 text-[#1B3139] mb-6">
          {title}
        </h2>

        {fields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block text-[#1B3139] text-[15px] md:text-[17px] leading-[24px] font-semibold pl-2 md:pl-5 mb-1">
              {field.label}
            </label>

            {field.type === 'input' && (
              <input
                type={field.inputType || 'text'}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 text-[#1B3139] border-gray-300 rounded-[25px] bg-white focus:outline-none focus:ring focus:ring-teal-400"
              />
            )}

            {field.type === 'select' && (
              <select className="w-full px-4 py-3 text-[#1B3139] border-gray-300 rounded-[25px] bg-white focus:outline-none focus:ring focus:ring-teal-400">
                {field.options.map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </select>
            )}

            {field.type === 'range' && (
              <>
                <p className='text-[#838490] font-semibold text-sm pr-2 text-right'>
                  {field.rangeLabel}
                </p>
                <input
                  type="range"
                  min={field.min || 0}
                  max={field.max || 100}
                  className="w-full h-[12px] rounded-[25px] focus:outline-none focus:ring focus:ring-teal-400"
                />
              </>
            )}

            {field.type === 'dateRange' && (
              <div className="flex flex-wrap gap-3">
                <input
                  type="date"
                  className="flex-1 min-w-[120px] px-4 py-3 text-sm text-[#1B3139] border-gray-300 rounded-[25px] bg-white focus:outline-none focus:ring focus:ring-teal-400"
                />
                <input
                  type="date"
                  className="flex-1 min-w-[120px] px-4 py-3 text-sm text-[#1B3139] border-gray-300 rounded-[25px] bg-white focus:outline-none focus:ring focus:ring-teal-400"
                />
              </div>
            )}
          </div>
        ))}

        <div className="flex flex-col">
          <button className="w-full bg-[#1FB58F] text-white py-3 rounded-[25px] hover:bg-teal-600">
            Apply Filter
          </button>

          <div className='flex gap-2 justify-center items-center mt-8'>
            <img src='/images/reset.png' alt="Reset" />
            <button className="font-normal text-sm text-black leading-[30px]">
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
