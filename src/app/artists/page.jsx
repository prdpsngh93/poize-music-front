import ArtistCard from "@/components/GlobalComponents/ArtistCard";
const artists = [
  {
    image: "/images/HomePage/artistOne.png",
    name: "Melow Muse",
    genre: "Electro Pop",
    description: "Electropop artist known for dreamy synth melodies, hypnotic beats, and introspective lyrics.",
  },
  {
    image: "/images/HomePage/artistTwo.png",
    name: "Ella Nova",
    genre: "Indie Pop",
    description: "Known for her ethereal tone and vivid storytelling.",
  },
  {
    image: "/images/HomePage/artistThree.png",
    name: "Black Horizon",
    genre: "Metal",
    description: "Hard-hitting band with a powerful live presence and aggressive sound.",
  },
   {
    image: "/images/HomePage/artistThree.png",
    name: "Black Horizon",
    genre: "Metal",
    description: "Hard-hitting band with a powerful live presence and aggressive sound.",
  },
   {
    image: "/images/HomePage/artistOne.png",
    name: "Melow Muse",
    genre: "Electro Pop",
    description: "Electropop artist known for dreamy synth melodies, hypnotic beats, and introspective lyrics.",
  },
  {
    image: "/images/HomePage/artistTwo.png",
    name: "Ella Nova",
    genre: "Indie Pop",
    description: "Known for her ethereal tone and vivid storytelling.",
  },
    {
    image: "/images/HomePage/artistTwo.png",
    name: "Ella Nova",
    genre: "Indie Pop",
    description: "Known for her ethereal tone and vivid storytelling.",
  },
  {
    image: "/images/HomePage/artistThree.png",
    name: "Black Horizon",
    genre: "Metal",
    description: "Hard-hitting band with a powerful live presence and aggressive sound.",
  },
   {
    image: "/images/HomePage/artistThree.png",
    name: "Black Horizon",
    genre: "Metal",
    description: "Hard-hitting band with a powerful live presence and aggressive sound.",
  },
 

  // Add more artists...
];

const ArtistsGrid = () => {
  return (
    <div className="py-12 px-4 mt-36 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist, index) => (
          <ArtistCard key={index} {...artist} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="px-6 py-2 border rounded-full font-medium hover:bg-black hover:text-white transition-all duration-300">
          Load More
        </button>
      </div>
    </div>
  );
};

export default ArtistsGrid;
