"use client"

import Image from 'next/image'
import React from 'react'

export default function Banner() {
    return (
        <section
            className="relative h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/banner.png')",
                // backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
            }}
        >

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                {/* <div className="relative max-w-[1414px] w-full h-[169px]">
                    <Image
                        src={'/images/poizeText.png'}
                        alt=" Music Collective"
                        fill
                        className="object-contain"
                    />
                </div> */}

                <p className="font-poppins mt-[70px] font-bold text-[48px] leading-[48px] tracking-[0px]">
                    Join the Sound Revolution
                </p>
                <p className="font-poppins mt-[30px] font-bold text-[28px] leading-[28px] tracking-[0px]">
                    Uniting artists, events, and fans in one immersive experience.
                </p>
                <div className="flex gap-4 mt-[60px] flex-wrap justify-center">
                    <button className="bg-black text-white px-[45px] py-3 rounded-full font-bold border  border-white  hover:bg-gray-200 transition font-poppins text-[28px] leading-[28px] tracking-[0px] uppercase">
                        EXPLORE OUR ARTISTS
                    </button>
                    <button className="bg-black border flex gap-x-7  items-center border-white text-white px-[45px] py-3 rounded-full font-bold hover:bg-white hover:text-black transition">
                        <Image src={'/images/voice.png'} width={45} height={35} alt='voice' />
                        <p className='font-poppins font-bold text-[28px] leading-[28px] tracking-[0px] uppercase'>
                            LISTEN NOW
                        </p>
                    </button>
                </div>
            </div>
        </section>
    )
}
