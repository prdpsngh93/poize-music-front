import React from 'react';

const GigCard = ({ title, genre, location, price, description, date, about }) => {
  return (
    <div className="bg-[#F1F0EA] rounded-[10px] py-9 px-[30px] flex flex-col justify-between min-h-[200px]">
      <div>
        <h3 className="text-2xl leading-[30px] text-[#1B3139] font-bold tracking-[0] ">{title}</h3>
        <p className="text-[16px] font-light text-[#1B3139] leading-[30px] tracking-[0] mb-4">{description}</p>
        <ul>
          <li className='font-semibold leading-[30px] text-[17px] text-[#1B3139] tracking-[0]'>📍 {location}</li>
          <li className='font-normal text-[15px] leading-[30px] text-[#1B3139] tracking-[0]'>🎵 {date}</li>
          <li className='font-normal text-[15px] leading-[30px] text-[#1B3139] tracking-[0]'>🎵 {genre}</li>
          <li className='font-normal text-[15px] leading-[30px] text-[#1B3139] tracking-[0]'>💲 {price}</li>
        </ul>
        <p className="text-[15px] font-normal text-black leading-[30px] mt-[9px] tracking-[0]">{about}</p>
      </div>
      <div className="flex justify-between gap-x-4 items-center mt-[30px]">
        <button className="border border-black py-3 h-[48px] w-full flex justify-center items-center max-w-[197px]  rounded-[25px]  hover:bg-gray-100">
          <span className='text-[#222222] font-semibold text-center leading-[100%] tracking-[0] text-[16px]'>
          Details

          </span>
        </button>
     <button className=" bg-[#1FB58F] py-3 h-[48px] w-full flex justify-center items-center max-w-[197px]  rounded-[25px]  hover:bg-gray-100">
          <span className='text-[#FFFFFF] font-semibold text-center leading-[100%] tracking-[0] text-[16px]'>
          Apply
          </span>
        </button>
      </div>
    </div>
  );
};

export default GigCard;
