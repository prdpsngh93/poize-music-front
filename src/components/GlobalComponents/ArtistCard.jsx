const ArtistCard = ({ image, name, genre, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">{genre}</p>
        <h3 className="text-lg font-semibold mt-1">{name}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default ArtistCard;
