const MusicianCard = ({ image, name, role, artist, onConnect }) => {
  return (
    <div className="w-full flex flex-col items-start text-left gap-2">
      <img
        src={image}
        alt={name}
        className="w-full h-[160px] object-cover rounded-lg"
      />
      <div className="w-full">
        <h4 className="font-semibold text-sm text-[#121417]">{name}</h4>
        <p className="text-xs text-gray-500 mb-2">{role}</p>
        <button
          onClick={() => onConnect(artist)}
          className="w-full px-3 py-2 bg-[#1FB58F] text-white text-xs font-medium rounded-md hover:bg-[#1AA87A] transition-colors duration-200"
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default MusicianCard;