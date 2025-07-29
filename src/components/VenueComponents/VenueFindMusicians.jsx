'use client';
import React, { useState, useMemo } from 'react';
import FindGigsSearchBar from '../FindgigsComponents/FindGigsSearchBar';
import MusicianCard from './MusicianCard';
import Dropdowns from './FilterDropDown';

const musicians = [
  {
    id: 1,
    name: 'Ethan Carter',
    role: 'Guitarist',
    genre: 'Rock',
    location: 'New York',
    experience: '3-5 Years',
    availability: 'Available',
    rating: '5 Stars',
    image: '/images/avatar.png',
    featured: true,
  },
  {
    id: 2,
    name: 'Olivia Hayes',
    role: 'Vocalist',
    genre: 'Pop',
    location: 'Los Angeles',
    experience: '1-3 Years',
    availability: 'Available',
    rating: '4 Stars',
    image: '/images/avatar.png',
    featured: true,
  },
  {
    id: 3,
    name: 'Liam Turner',
    role: 'Bassist',
    genre: 'Blues',
    location: 'Austin',
    experience: '5+ Years',
    availability: 'Unavailable',
    rating: '3 Stars',
    image: '/images/avatar.png',
    featured: false,
  },{
    id: 1,
    name: 'Ethan Carter',
    role: 'Guitarist',
    genre: 'Rock',
    location: 'New York',
    experience: '3-5 Years',
    availability: 'Available',
    rating: '5 Stars',
    image: '/images/avatar.png',
    featured: true,
  },
  {
    id: 2,
    name: 'Olivia Hayes',
    role: 'Vocalist',
    genre: 'Pop',
    location: 'Los Angeles',
    experience: '1-3 Years',
    availability: 'Available',
    rating: '4 Stars',
    image: '/images/avatar.png',
    featured: true,
  },
  {
    id: 3,
    name: 'Liam Turner',
    role: 'Bassist',
    genre: 'Blues',
    location: 'Austin',
    experience: '5+ Years',
    availability: 'Unavailable',
    rating: '3 Stars',
    image: '/images/avatar.png',
    featured: false,
  },
  // ... add more
];

const filters = {
  Genre: ['Rock', 'Pop', 'Metal', 'Jazz', 'Blues'],
  Skills: ['Guitarist', 'Vocalist', 'Drummer', 'Keyboardist', 'Bassist'],
  Location: ['New York', 'Los Angeles', 'Austin', 'Chicago', 'Seattle'],
  Experience: ['<1 Year', '1-3 Years', '3-5 Years', '5+ Years'],
  Availability: ['Available', 'Unavailable'],
  Rating: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
};

const VenueFindMusicians = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (updatedFilters) => {
    setSelectedFilters(updatedFilters);
  };

  const filteredMusicians = useMemo(() => {
    return musicians.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilters = Object.entries(selectedFilters).every(([key, value]) => {
        if (!value) return true;
        return (
          m[key.toLowerCase()]?.toLowerCase().includes(value.toLowerCase()) ||
          m.role?.toLowerCase().includes(value.toLowerCase()) ||
          m.genre?.toLowerCase().includes(value.toLowerCase())
        );
      });

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, selectedFilters]);

  return (
    <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Find Musicians!</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Discover talented musicians for your venue. Use filters to refine your search and find the perfect match for your event.
          </p>
        </div>

        <FindGigsSearchBar
          placeholder="Search by name, genre, or skill"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Dropdowns filterData={filters} onChange={handleFilterChange} />

        {/* Featured Musicians */}
        <div className='flex  flex-col items-center justify-center md:items-start'>
          <h2 className="text-lg text-[#121417] font-bold mb-4">Featured Musicians</h2>
          <div className="flex flex-wrap gap-6 items-center justify-center md:items-start md:justify-start overflow-x-auto pb-2">
            {filteredMusicians.filter((m) => m.featured).map((m) => (
              <MusicianCard key={m.id} {...m} />
            ))}
          </div>
        </div>

        {/* All Musicians */}
        <div className='flex  flex-col items-center justify-center md:items-start'>
          <h2 className="text-lg text-[#121417] font-bold  mb-4">All Musicians</h2>
          <div className="flex flex-wrap items-center justify-center md:items-start md:justify-start gap-6">
  {musicians.map((m) => (
    <MusicianCard key={m.id} {...m} />
  ))}
</div>
        </div>
      </div>
    </main>
  );
};

export default VenueFindMusicians;
