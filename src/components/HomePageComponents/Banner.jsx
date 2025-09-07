"use client"

import Image from 'next/image'
import React from 'react'
import { Stardos_Stencil } from 'next/font/google';
import Link from 'next/link';
const stencil = Stardos_Stencil({
  weight: '400',
  subsets: ['latin'],
});

export default function Banner() {
    return (
        <section
            className="relative  h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/banner.png')",
                // backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
            }}
        >

            <div className="relative  z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
              
               <div className='flex flex-col justify-between gap-4 lg:gap-15'>
               <h1 className={`font-NewPressErodedBold pt-32  text-white uppercase font-bold text-5xl md:text-7xl xl:text-8xl tracking-widest`}>
            POIZE MUSIC COLLECTIVE
          </h1>
               <div className='flex flex-col gap-4 xl:gap-10'>
                <p className="font-anton  font-bold text-xl md:text-3xl xl:text-5xl  leading-10 tracking-[0px]">
                    Join the Sound Revolution
                </p>
                <p className="font-anton  font-bold md:text-xl xl:text-3xl leading-7  tracking-[0px]">
                    Uniting artists, events, and fans in one immersive experience.
                </p>
                <div className="flex gap-4  flex-wrap justify-center">
                    <Link
                href="/venue-find-musician"
                    className="bg-black cursor-pointer text-white px-[45px] py-3 rounded-full font-bold border  border-white   transition font-anton  xl:text-3xl leading-[28px] tracking-[0px] uppercase">
                        EXPLORE OUR ARTISTS
                    </Link>
                    <button className="bg-black border  cursor-pointer flex gap-x-7  items-center border-white text-white px-[45px] py-3 rounded-full font-bold   transition">
                        <Image src={'/images/voice.png'} width={45} height={35} className='w-9' alt='voice' />
                        <p className='font-anton   font-bold xl:text-3xl leading-[28px] tracking-[0px] uppercase'>
                            LISTEN NOW
                        </p>
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}
