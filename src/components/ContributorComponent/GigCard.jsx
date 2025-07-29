// components/GigCard.js
import Image from "next/image";

const GigCard = ({ title, subtitle, image, text }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full border-b-2 border-gray-200 py-4 md:py-6 gap-4 md:gap-6">
      {/* Text Section */}
      <div className="flex-1 w-full md:w-auto">
        <h3 className="text-base font-semibold text-[#121417]">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        <button className="mt-2 flex items-center gap-2 justify-center w-fit bg-[#1FB58F] text-white text-sm px-4 py-1.5 rounded-xl hover:bg-green-600 transition-all">
          {text}
        </button>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-[50%] h-48 md:h-32 rounded-xl overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default GigCard;
