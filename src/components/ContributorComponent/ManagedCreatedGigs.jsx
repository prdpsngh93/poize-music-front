import React from 'react'
import FindGigsSearchBar from '../FindgigsComponents/FindGigsSearchBar'
import ContributorGigList from './ContributorGigList'
import Dropdowns from '../FindgigsComponents/Dropdowns'
import ContributorDropdowns from './ContributorDropdown'

const ManagedCreatedGigs = () => {
    
const filterOptions = {
  Date: ['Today', 'This Week', 'This Month'],
  Venue: ['The Arena', 'The Grand Hall', 'The Underground'],
  Status: ['Pending', 'Confirmed', 'Booked'],
};

  return (
   
      <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {/* Heading */}
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Manage Created Gigs</h1>
           
          </div>

          {/* Search Bar */}
          <FindGigsSearchBar placeholder={"Search"} />

          {/* Dropdown Filters */}
          <ContributorDropdowns filters={filterOptions} />
    <ContributorGigList/>
    </div>
    </main>
  )
}

export default ManagedCreatedGigs
