"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "WolfThemes has completely transformed how we showcase our artists. The design is sleek, modern, and exactly what we needed to take our collective to the next level.",
    name: "Alex Romero",
    title: "Founder of Pulse Collective",
    image: "/images/HomePage/testimonails.jpg",
  },
  {
    quote:
      "An incredible experience from start to finish. Everything feels smooth, intuitive, and tailored to artists.",
    name: "Jordan Blake",
    title: "Music Curator",
    image: "/images/HomePage/testimonails.jpg",
  },
  {
    quote:
      "Working with WolfThemes made it so easy to build a strong identity for our collective. Highly recommended!",
    name: "Taylor James",
    title: "Creative Director",
    image: "/images/HomePage/testimonails.jpg",
  },
];

export default function TestimonialSlider() {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="w-full bg-[#F1F0EB] px-4 py-16">
      <div className="container mx-auto h-[500px] bg-black text-white rounded-2xl px-6 py-12 text-center relative shadow-lg overflow-hidden">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <p className="text-[16px] text-white mb-2">{item.title}</p>
                <blockquote className="font-bold text-[24px] max-w-[800px] mx-auto tracking-[0]  font-poppins">
                  {item.quote}
                </blockquote>
                <div className="flex justify-center mb-3 mt-10">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-full border-2 border-white shadow-sm"
                  />
                </div>
                <p className="font-medium text-[18px]">{item.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      
        <div className="absolute   bottom-6 left-28 text-white border-2 border-white px-4 py-1 rounded-full text-2xl font-bold shadow">
          {currentSlide + 1}/{testimonials.length}
        </div>

        
        <div className="absolute bottom-6 right-28 flex items-center gap-3">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="hover:cursor-pointer"
            aria-label="Previous"
          >
            <ArrowLeft size={60} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="hover:cursor-pointer"    
            aria-label="Next"
          >
            <ArrowRight size={60} />
          </button>
        </div>
      </div>
    </section>
  );
}
