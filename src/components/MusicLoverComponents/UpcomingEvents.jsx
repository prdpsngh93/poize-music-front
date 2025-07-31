const UpcomingEvents = () => {
  const events = [
    {
      title: 'Electronic Beats',
      location: 'The Groove Room',
      image: '/images/upcominggig2.png',
      bgColor: 'bg-[#f0e4d2]',
    },
    {
      title: 'Acoustic Night',
      location: 'The Cozy Corner',
      image: '/images/upcominggig3.png',
      bgColor: 'bg-[#bcae8c]',
    },
    {
      title: 'Jazz Fusion',
      location: 'The Blue Note',
      image: '/images/upcominggig1.png',
      bgColor: 'bg-[#d6d6d6]',
    },
    {
      title: 'Electronic Beats',
      location: 'The Groove Room',
      image: '/images/upcominggig2.png',
      bgColor: 'bg-[#e8e6e2]',
    },
     {
      title: 'Electronic Beats',
      location: 'The Groove Room',
      image: '/images/upcominggig2.png',
      bgColor: 'bg-[#f0e4d2]',
    },
    {
      title: 'Acoustic Night',
      location: 'The Cozy Corner',
      image: '/images/upcominggig3.png',
      bgColor: 'bg-[#bcae8c]',
    },
    {
      title: 'Jazz Fusion',
      location: 'The Blue Note',
      image: '/images/upcominggig1.png',
      bgColor: 'bg-[#d6d6d6]',
    },
   
  ];

  return (
    <section className="space-y-6 px-4 md:px-0">
      <h3 className="font-semibold text-lg md:text-xl text-[#121217]">Upcoming Events</h3>

      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4  pb-2">
        {events.map((event, idx) => (
          <div key={idx} className="flex flex-col items-center text-center space-y-2 flex-shrink-0">
            <div
              className={`w-[140px] h-[180px]  rounded-xl overflow-hidden shadow-md flex items-center justify-center ${event.bgColor}`}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-[100px] h-[140px]  object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-sm md:text-base text-[#121417]">{event.title}</p>
              <p className="text-xs md:text-sm text-gray-500">{event.location}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex itmes-center justify-center">
      <button className="text-white border-none py-2 px-8 rounded-full bg-[#1FB58F]">
        Save
      </button>
      </div>
    </section>
  );
};

export default UpcomingEvents;
