import Link from "next/link";

// components/GigCard.js
const GigCard = ({ data }) => {
  const imageUrl =
    data?.attachment_url && data.attachment_url.trim() !== ""
      ? data.attachment_url
      : "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full border-b border-gray-200 py-4 md:py-6 gap-4 md:gap-6">
      {/* Text Section */}
      <div className="flex-1 w-full md:w-auto">
        <h3 className="text-base font-semibold text-[#121417]">
          {data?.gig_title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{data?.description}</p>
        <Link className="mt-2 flex items-center gap-2 justify-center w-fit bg-[#1FB58F] text-white text-sm px-4 py-1.5 rounded-xl hover:bg-green-600 transition-all"
        href={'/manage-created-gigs'}>
          View details
        </Link>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-[50%] h-48 md:h-32 rounded-xl overflow-hidden">
        <img
          src={imageUrl}
          alt={data?.gig_title || "Gig image"}
          className="w-full h-full object-none rounded-xl"
        />
      </div>
    </div>
  );
};

export default GigCard;
