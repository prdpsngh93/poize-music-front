import React from "react";

const Hero = ({title}) => {
  return (
    <section className="relative h-[90vh] max-h-[825px] w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/hero.png" // Replace with actual image path
        alt="Live Performance"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0  bg-opacity-50 z-10" />

      {/* Centered Hero Text */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <h1 className="text-white  lg:text-[155px] text-[50px] md:text-[100px] font-extrabold font-juno tracking-widest uppercase">
         {title ||  "POST GRID"} 
        </h1>
      </div>
    </section>
  );
};

export default Hero;
