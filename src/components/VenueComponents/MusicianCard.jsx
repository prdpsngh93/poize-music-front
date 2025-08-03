const MusicianCard = ({ image, name, role }) => {
  return (
    <div className="w-full flex flex-col items-start text-left gap-2">
      <img
        src={image}
        alt={name}
        className="w-full h-[160px] object-cover rounded-lg"
      />
      <h4 className="font-semibold text-sm text-[#121417]">{name}</h4>
      <p className="text-xs text-gray-500">{role}</p>
    </div>
  );
};

export default MusicianCard;
