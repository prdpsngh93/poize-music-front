// components/InterestedArtists.js

const artists = [
  {
    name: "Lucas Hayes",
    genre: "Indie Rock",
    image: "/images/avatar.png",
  },
  {
    name: "Sophia Green",
    genre: "Acoustic Pop",
    image: "/images/avatar.png",
  },
  {
    name: "Caleb Foster",
    genre: "Electronic Dance",
    image: "/images/avatar.png",
  },
];

const InterestedArtists = () => {
  return (
    <div className="w-full mt-8">
      <h2 className="text-base md:text-lg font-semibold text-[#121417] mb-4">
        Artists Showing Interest
      </h2>
      <div className="flex flex-wrap gap-6 md:gap-8">
        {artists.map((artist, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center w-24 md:w-28"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-transparent hover:border-[#1FB58F] transition-all duration-300">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-[#121417]">{artist.name}</p>
            <p className="text-xs text-gray-500">{artist.genre}</p>
          </div>
        ))}
      </div>
      <hr className="mt-6 border-gray-200" />
    </div>
  );
};

export default InterestedArtists;
