import Link from "next/link";

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
  // Support both data object structure and individual props
  const gigTitle = title || data?.gig_title || "Untitled Event";
  const gigSubtitle = subtitle || data?.description || "";
  const imageUrl = image || 
    (data?.attachment_url && data.attachment_url.trim() !== "" 
      ? data.attachment_url 
      : "https://via.placeholder.com/400x300?text=No+Image");
  const buttonText = text || "View details";
  const linkDestination = linkTo || '/manage-created-gigs';

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full border-b border-gray-200 py-4 md:py-6 gap-4 md:gap-6">
      {/* Text Section */}
      <div className="flex-1 w-full md:w-auto">
        <h3 className="text-base font-semibold text-[#121417]">
          {gigTitle}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{gigSubtitle}</p>
        
        {/* Button with onClick or Link functionality */}
        {onClick ? (
          <button 
            onClick={onClick}
            className="mt-2 flex items-center gap-2 justify-center w-fit bg-[#1FB58F] text-white text-sm px-4 py-1.5 rounded-xl hover:bg-green-600 transition-all cursor-pointer"
          >
            {buttonText}
          </button>
        ) : (
          <Link 
            className="mt-2 flex items-center gap-2 justify-center w-fit bg-[#1FB58F] text-white text-sm px-4 py-1.5 rounded-xl hover:bg-green-600 transition-all"
            href={linkDestination}
          >
            {buttonText}
          </Link>
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
  );
};

export default GigCard;