import React from "react";
import { useRouter } from "next/navigation";

const Cards = ({ gigs }) => {
  const router = useRouter();

  const handleViewDetails = (gigId) => {
    router.push(`/find-gigs/${gigId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-[#f4f3ee]">
      {gigs.map((gig) => (
        <div
          key={gig.id}
          className="flex flex-col md:flex-row justify-between items-start gap-6 py-6 border-b border-gray-200 hover:bg-white hover:shadow-sm transition-all duration-200 rounded-lg px-4 md:px-6"
        >
          {/* Text Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 hover:text-[#1FB58F] transition-colors cursor-pointer"
                onClick={() => handleViewDetails(gig.id)}>
              {gig.gig_title}
            </h2>

            {/* Date and Duration */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <div className="flex items-center justify-center md:justify-start gap-1">
                <span className="text-sm text-gray-500">📅</span>
                <span className="text-sm text-gray-600 font-medium">
                  {formatDate(gig.date_time)}
                </span>
              </div>
              
              {gig.duration && (
                <>
                  <span className="hidden sm:inline text-gray-400">|</span>
                  <div className="flex items-center justify-center md:justify-start gap-1">
                    <span className="text-sm text-gray-500">⏰</span>
                    <span className="text-sm text-gray-600">
                      {gig.duration}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Genre and Artist Type */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              {gig.genre && (
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  🎵 {gig.genre}
                </span>
              )}
              
              {gig.artist_type && (
                <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                  🎤 {gig.artist_type}
                </span>
              )}
            </div>

            {/* Payment and Perks */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
              {gig.payment_option && (
                <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  💰 {gig.payment_option}
                </span>
              )}
              
              {gig.perks && (
                <span className="inline-block px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                  🎁 {truncateText(gig.perks, 30)}
                </span>
              )}
            </div>

            {/* Description */}
            {gig.gig_description && (
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {truncateText(gig.gig_description)}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleViewDetails(gig.id)}
                className="px-4 py-2 text-sm bg-[#1FB58F] text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                View Details & Apply
              </button>
              
              <button
                onClick={() => handleViewDetails(gig.id)}
                className="px-4 py-2 text-sm border border-[#1FB58F] text-[#1FB58F] rounded-lg hover:bg-[#1FB58F] hover:text-white transition-colors font-medium"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="w-full max-w-[280px] h-32 md:h-40 overflow-hidden rounded-lg flex-shrink-0">
            <img
              src={gig.gig_image || "/images/cards1.png"}
              alt={gig.gig_title}
              className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handleViewDetails(gig.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;