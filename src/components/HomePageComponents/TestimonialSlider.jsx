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
    <section className="w-full bg-[#F1F0EB] px-4 md:px-9 lg:px-12 py-16 md:py-24">
      <div className="container mx-auto min-h-[450px] md:h-[504px] bg-[url('/images/bg-image.png')] bg-cover bg-center text-white rounded-2xl px-4 sm:px-6 md:px-8 py-10 md:py-12 text-center relative shadow-lg overflow-hidden">
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 rounded-2xl z-0"></div>

        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center h-[400px] sm:h-[400px] text-center z-10 relative">
                <p className="text-sm sm:text-base text-white mb-2">{item.title}</p>
                <blockquote className="font-bold text-lg sm:text-2xl max-w-[90%] sm:max-w-[800px] mx-auto tracking-normal font-anton">
                  {item.quote}
                </blockquote>
                <div className="flex justify-center mb-3 mt-8 sm:mt-10">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-white shadow-sm w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]"
                  />
                </div>
                <p className="font-medium text-base sm:text-lg">{item.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Slide counter */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-12 text-white border-2 border-white px-3 sm:px-4 py-1 rounded-full text-lg sm:text-2xl font-bold shadow z-10">
          {currentSlide + 1}/{testimonials.length}
        </div>

        {/* Navigation buttons */}
        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-12 z-10 flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="hover:cursor-pointer"
            aria-label="Previous"
          >
            <ArrowLeft size={40} className="sm:size-[60px]" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="hover:cursor-pointer"
            aria-label="Next"
          >
            <ArrowRight size={40} className="sm:size-[60px]" />
          </button>
        </div>
      </div>
    </section>
  );
}
