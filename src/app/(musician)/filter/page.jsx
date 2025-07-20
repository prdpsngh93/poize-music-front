"use client";
import { useState, useEffect } from "react";
import { Search, X, MapPin, Filter as FilterIcon } from "lucide-react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import SearchResultCard from "@/components/GlobalComponents/SearchResultCard";

const FilterComponent = ({
  onFilterChange,
  initialFilters = {},
  searchPlaceholder = "Search for artists or venues",
  showMobileToggle = true,
}) => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    filterType: "Artist",
    genres: [],
    availability: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      selectedDates: [],
    },
    location: "",
    ...initialFilters,
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults([
      {
        id: 1,
        name: "Sophia Carter",
        type: "Artist",
        genre: "Soul",
        image: "/images/avatar.png",
        availability:"4.5"
      },
      {
        id: 2,
        name: "The Blue Note",
        type: "Venue",
        genre: "Jazz",
        image: "/images/avatar.png",
        availability:"4.2"
      },
      {
        id: 3,
        name: "Ethan Bennett",
        type: "Artist",
        genre: "Rock",
        image: "/images/avatar.png",
         availability:"4.2"
      },
      {
        id: 4,
        name: "The Grand Stage",
        type: "Venue",
        genre: "Rock",
        image: "/images/avatar.png",
         availability:"4.2"
      },
    ]);
  }, []);

  const genres = [
    { id: "jazz", label: "Jazz" },
    { id: "edm", label: "EDM" },
    { id: "rock", label: "Rock" },
    { id: "pop", label: "Pop" },
    { id: "classical", label: "Classical" },
    { id: "hiphop", label: "Hip Hop" },
  ];

  const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();
  const getFirstDayOfMonth = (month, year) =>
    new Date(year, month - 1, 1).getDay();

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(
      filters.availability.month,
      filters.availability.year
    );
    const firstDay = getFirstDayOfMonth(
      filters.availability.month,
      filters.availability.year
    );
    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleGenreToggle = (genreId) => {
    const newGenres = filters.genres.includes(genreId)
      ? filters.genres.filter((id) => id !== genreId)
      : [...filters.genres, genreId];
    handleFilterChange("genres", newGenres);
  };

  const handleDateToggle = (day) => {
    const dateKey = `${filters.availability.year}-${filters.availability.month}-${day}`;
    const newDates = filters.availability.selectedDates.includes(dateKey)
      ? filters.availability.selectedDates.filter((date) => date !== dateKey)
      : [...filters.availability.selectedDates, dateKey];

    handleFilterChange("availability", {
      ...filters.availability,
      selectedDates: newDates,
    });
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      searchTerm: "",
      filterType: "Artist",
      genres: [],
      availability: {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        selectedDates: [],
      },
      location: "",
    };
    setFilters(clearedFilters);
    setSearchResults([]); // optional: clear results
    onFilterChange?.(clearedFilters);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-4 border border-gray-200">
        <h3 className="text-sm font-semibold mb-3 text-gray-800">Filters</h3>
        <div className="flex gap-2">
          {["Artist", "Venue"].map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange("filterType", type)}
              className={`px-4 py-2 text-sm rounded-2xl transition ${
                filters.filterType === type
                  ? "bg-[#1FB58F] text-white"
                  : "bg-[#E3DFCB] text-gray-700 hover:bg-gray-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-200">
        <h3 className="text-sm font-semibold mb-3 text-gray-800">Genre</h3>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreToggle(genre.id)}
              className={`px-3 py-1 text-sm rounded-2xl transition ${
                filters.genres.includes(genre.id)
                  ? "bg-[#1FB58F] text-white"
                  : "bg-[#E3DFCB] text-gray-700 hover:bg-gray-300"
              }`}
            >
              {genre.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-200">
        <h3 className="text-sm font-semibold mb-3 text-gray-800">Availability</h3>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              const newMonth = filters.availability.month === 1 ? 12 : filters.availability.month - 1;
              const newYear = filters.availability.month === 1 ? filters.availability.year - 1 : filters.availability.year;
              handleFilterChange("availability", {
                ...filters.availability,
                month: newMonth,
                year: newYear,
              });
            }}
          >
            <MdKeyboardArrowLeft className="text-black" />
          </button>
          <span className="text-sm font-medium text-gray-800">
            {monthNames[filters.availability.month - 1]} {filters.availability.year}
          </span>
          <button
            onClick={() => {
              const newMonth = filters.availability.month === 12 ? 1 : filters.availability.month + 1;
              const newYear = filters.availability.month === 12 ? filters.availability.year + 1 : filters.availability.year;
              handleFilterChange("availability", {
                ...filters.availability,
                month: newMonth,
                year: newYear,
              });
            }}
          >
            <MdKeyboardArrowRight className="text-black" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-xs">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div key={day} className="text-center p-1 text-gray-500 font-medium">
              {day}
            </div>
          ))}
          {generateCalendarDays().map((day, index) => {
            if (day === null) return <div key={index} className="p-1"></div>;
            const dateKey = `${filters.availability.year}-${filters.availability.month}-${day}`;
            const isSelected = filters.availability.selectedDates.includes(dateKey);
            const isToday =
              day === new Date().getDate() &&
              filters.availability.month === new Date().getMonth() + 1 &&
              filters.availability.year === new Date().getFullYear();

            return (
              <button
                key={day}
                onClick={() => handleDateToggle(day)}
                className={`p-1 text-center rounded-full transition ${
                  isSelected
                    ? "bg-[#1FB58F] text-white"
                    : isToday
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100 text-black"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-200">
        <h3 className="text-sm font-semibold mb-3 text-gray-800">Location</h3>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search location"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
          />
        </div>
      </div>

      <button
        onClick={clearAllFilters}
        className="w-full py-2 px-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 text-sm font-medium"
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f3ee]">
      <div className="px-4 md:px-9 lg:px-12 py-10 max-w-7xl flex flex-col gap-10 mx-auto">
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Filter</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, odio!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {showMobileToggle && (
            <div className="lg:hidden">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-gray-200 text-sm font-medium"
              >
                <FilterIcon className="h-4 w-4" />
                Filter
              </button>
            </div>
          )}

          <div className={`lg:w-80 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filter</h2>
                {showMobileToggle && (
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="lg:hidden p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Lorem ipsum is simply dummy text of the printing and typesetting industry.
              </p>
              <FilterContent />
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white flex flex-col gap-7 rounded-2xl p-4 border border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1FB58F]"
                />
              </div>

              <h3 className="text-lg font-semibold  text-gray-800">Search Results</h3>

              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((result) => (
                    <SearchResultCard key={result.id} result={result} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <div className="text-4xl">🎵</div>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">No results found</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 bg-[#1FB58F] text-white rounded-2xl hover:bg-green-500 transition text-sm font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
