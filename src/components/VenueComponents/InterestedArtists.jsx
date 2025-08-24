// components/InterestedArtists.js
const InterestedArtists = ({ artists = [] }) => {
  // Show message when no artists are available
  if (!artists || artists.length === 0) {
    return (
      <div className="w-full mt-8">
        <h2 className="text-base md:text-lg font-semibold text-[#121417] mb-4">
          Artists Showing Interest
        </h2>
        <div className="bg-white rounded-lg p-6 text-center">
          <p className="text-gray-500">No artists have shown interest yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Keep posting great gigs to attract talented artists!
          </p>
        </div>
        <hr className="mt-6 border-gray-200" />
      </div>
    );
  }

  return (
    <div className="w-full mt-8">
      <h2 className="text-base md:text-lg font-semibold text-[#121417] mb-4">
        Artists Showing Interest ({artists.length})
      </h2>
      <div className="flex flex-wrap gap-6 md:gap-8">
        {artists.map((artist, index) => (
          <div
            key={artist.id || index}
            className="flex flex-col items-center text-center w-24 md:w-28"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-transparent hover:border-[#1FB58F] transition-all duration-300">
              <img
                src={artist.profile_picture || "/images/avatar.png"}
                alt={`Artist ${artist.id}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/images/avatar.png";
                }}
              />
            </div>
            <p className="mt-2 text-sm font-medium text-[#121417]">
              Artist {artist.id?.slice(-4) || index + 1}
            </p>
            <p className="text-xs text-gray-500">
              {artist.genre || "Mixed Genre"}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              {artist.gigs_completed || 0} gigs completed
            </p>
          
          </div>
        ))}
      </div>
      {artists.length > 6 && (
        <div className="mt-4 text-center">
          <button className="text-[#1FB58F] hover:underline text-sm font-medium">
            View All Artists ({artists.length})
          </button>
        </div>
      )}
      <hr className="mt-6 border-gray-200" />
    </div>
  );
};

export default InterestedArtists;