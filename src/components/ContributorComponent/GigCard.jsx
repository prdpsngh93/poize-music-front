import Link from "next/link";
import { useState } from "react";

// Modal Component
const GigModal = ({ isOpen, onClose, data, title, subtitle, image }) => {
  if (!isOpen) return null;

  const gigTitle = title || data?.gig_title || "Untitled Event";
  const gigSubtitle = subtitle || data?.description || data?.gig_description;
  const imageUrl = image || 
    (data?.attachment_url && data.attachment_url.trim() !== "" 
      ? data.attachment_url 
      : "https://via.placeholder.com/400x300?text=No+Image");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-[#121417]">Gig Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-light"
          >
            ×
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-6">
          {/* Image */}
          <div className="w-full h-64 rounded-lg overflow-hidden mb-6">
            <img
              src={imageUrl}
              alt={gigTitle || "Gig image"}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Title and Description */}
          <h3 className="text-2xl font-bold text-[#121417] mb-4">
            {gigTitle}
          </h3>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            {gigSubtitle || "No description available."}
          </p>
          
          {/* Additional Details */}
          {data && (
            <div className="space-y-3">
              {data.date && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600">Date:</span>
                  <span className="text-gray-800">{data.date}</span>
                </div>
              )}
              
              {data.location && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600">Location:</span>
                  <span className="text-gray-800">{data.location}</span>
                </div>
              )}
              
              {data.price && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600">Price:</span>
                  <span className="text-gray-800">{data.price}</span>
                </div>
              )}
              
              {data.organizer && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600">Organizer:</span>
                  <span className="text-gray-800">{data.organizer}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1FB58F] text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

// components/GigCard.js
const GigCard = ({ 
  data, 
  title, 
  subtitle, 
  image, 
  text, 
  onClick,
  linkTo 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Support both data object structure and individual props
  const gigTitle = title || data?.gig_title || "Untitled Event";
  const gigSubtitle = subtitle || data?.description || "";
  const imageUrl = image || 
    (data?.attachment_url && data.attachment_url.trim() !== "" 
      ? data.attachment_url 
      : "https://via.placeholder.com/400x300?text=No+Image");
  const buttonText = text || "View details";

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    } else if (!linkTo || linkTo.trim() === "") {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center w-full border-b border-gray-200 py-4 md:py-6 gap-4 md:gap-6">
        {/* Text Section */}
        <div className="flex-1 w-full md:w-auto">
          <h3 className="text-base font-semibold text-[#121417]">
            {gigTitle}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{gigSubtitle}</p>
          
          {/* Button with conditional functionality */}
          {linkTo && linkTo.trim() !== "" ? (
            <Link 
              className="mt-2 flex items-center gap-2 justify-center w-fit bg-[#1FB58F] text-white text-sm px-4 py-1.5 rounded-xl hover:bg-green-600 transition-all"
              href={linkTo}
            >
              {buttonText}
            </Link>
          ) : (
            <button 
              onClick={handleButtonClick}
              className="mt-2 flex items-center gap-2 justify-center w-fit bg-[#1FB58F] text-white text-sm px-4 py-1.5 rounded-xl hover:bg-green-600 transition-all cursor-pointer"
            >
              {buttonText}
            </button>
          )}
        </div>

        {/* Image Section */}
        <div className="w-full md:w-[50%] h-48 md:h-32 rounded-xl overflow-hidden">
          <img
            src={imageUrl}
            alt={gigTitle || "Gig image"}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Modal */}
      <GigModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={data}
        title={title}
        subtitle={subtitle}
        image={image}
      />
    </>
  );
};

export default GigCard;