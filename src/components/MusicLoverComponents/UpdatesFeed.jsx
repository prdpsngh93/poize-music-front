import React from "react";

const UpdatesFeed = () => {
  const updates = [
    {
      image: "/images/upcominggig1.png",
      title: "New Album Release: 'Celestial Echoes'",
      description:
        "The Luminary Echoes have just dropped their latest album, 'Celestial Echoes'. Dive into a world of ethereal melodies and captivating rhythms. Available now on all major platforms!",
      artist: "The Luminary Echoes",
    },
    {
      image: "/images/upcominggig2.png",
      title: "New Album Release: 'Celestial Echoes'",
      description:
        "The Luminary Echoes have just dropped their latest album, 'Celestial Echoes'. Dive into a world of ethereal melodies and captivating rhythms. Available now on all major platforms!",
      artist: "The Luminary Echoes",
    },
    {
      image: "/images/upcominggig3.png",
      title: "New Album Release: 'Celestial Echoes'",
      description:
        "The Luminary Echoes have just dropped their latest album, 'Celestial Echoes'. Dive into a world of ethereal melodies and captivating rhythms. Available now on all major platforms!",
      artist: "The Luminary Echoes",
    },
    {
      image: "/images/upcominggig2.png",
      title: "New Album Release: 'Celestial Echoes'",
      description:
        "The Luminary Echoes have just dropped their latest album, 'Celestial Echoes'. Dive into a world of ethereal melodies and captivating rhythms. Available now on all major platforms!",
      artist: "The Luminary Echoes",
    },
    {
      image: "/images/upcominggig1.png",
      title: "New Album Release: 'Celestial Echoes'",
      description:
        "The Luminary Echoes have just dropped their latest album, 'Celestial Echoes'. Dive into a world of ethereal melodies and captivating rhythms. Available now on all major platforms!",
      artist: "The Luminary Echoes",
    },
  ];

  return (
    <div className="flex-1 space-y-6">
      {updates.map((update, i) => (
        <div
          key={i}
          className="flex flex-col lg:flex-row gap-4  rounded-xl  "
        >
          <img
            src={update.image}
            alt="Gig"
            className="w-full lg:w-80 h-50 object-cover rounded-md"
          />
          <div className="flex flex-col justify-start gap-4">
            <h3 className="font-semibold text-sm text-[#121417]">
              {update.title}
            </h3>
            <p className="text-sm text-[#3c3c3c]">{update.description}</p>
            <p className="text-xs text-gray-900">{update.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdatesFeed;
