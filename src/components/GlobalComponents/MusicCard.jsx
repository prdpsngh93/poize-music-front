import React from 'react';

const MusicCard = ({ image, genre, location, price, description, date, about }) => {
    return (
        <div className="bg-[#F1F0EA] rounded-[10px] py-[20px] px-[27px] flex flex-col justify-between min-h-[200px]">
            <div className='flex flex-col items-center mb-[18px]'>
                <img
                    src='./images/girl.jpg' className='h-[135px] w-[135px] mb-[13px] border rounded-full'></img>
                <p className="text-[24px] font-bold text-[#1B3139] leading-[30px] tracking-[0] mb-[7px]">{description}</p>
                <p className='font-normal leading-[30px] text-[17px] text-[#1B3139] tracking-[0] mb-[5px]'>📍 {location}</p>
                <p className='font-semibold leading-[30px] text-[17px] text-[#1B3139] tracking-[0]'>⭐ 4.7 <span className='font-normal leading-[30px] text-[17px] text-[#1B3139] tracking-[0]'>(19 Reviews)</span></p>
            </div>
                <div className='mb-[18px]'>
                    <p className='font-bold text-[19px] leading-[30px] tracking-[0] text-[#1B3139]'>Instruments:</p>
                    <div className='flex gap-[10px] mt-[15px]'>
                        <button className='border-[2px] border-black rounded-[25px]'><span className='text-[14px] font-medium leading-[100%] tracking-[0] text-[#222222] px-8 py-[4px]'>Lorem</span></button>
                        <button className='border-[2px]  border-black  rounded-[25px]'><span className='text-[14px] font-medium leading-[100%] tracking-[0] text-[#222222] px-8 py-[4px]'>Lorem</span></button>
                    </div>
                </div>
                <div>
                    <p className='font-bold text-[19px] leading-[30px] tracking-[0] text-[#1B3139]'>Lorem Ipsum</p>
                    <div className='flex gap-[10px] mt-[15px]'>
                        <button className='bg-[#ffffff] rounded-[25px]'><span className= 'text-[14px] font-medium leading-[100%] tracking-[0] text-[#222222] px-8 py-[4px]'>Lorem</span></button>
                        <button className='bg-[#ffffff] rounded-[25px]'><span className='text-[14px] font-medium leading-[100%] tracking-[0] text-[#222222] px-8 py-[4px]'>Lorem</span></button>
                    </div>
                </div>
                <div className='mt-[22px] mb-[37px]'>
                <p className="text-[15px] font-normal text-[#000000] leading-[30px] tracking-[0] mb-[7px]">{about}</p>
                </div>
            <div className="flex justify-between gap-x-4 items-center">
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

export default MusicCard;
