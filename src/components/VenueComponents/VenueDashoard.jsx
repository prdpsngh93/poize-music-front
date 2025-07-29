import React from 'react'
import StatsDashboard from './StatsDashboard'
import GigCard from '../ContributorComponent/GigCard'
import InterestedArtists from './InterestedArtists'
import EngagementOverview from './EngagementOverview'
import QuickActionsAndNotifications from './QuickActionsAndNotifications'

const VenueDashoard = () => {
  return (
    
      <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {/* Heading */}
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Welcome back, Clara!</h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              Explore opportunities to perform and connect with audiences.
            </p>
          </div>
<StatsDashboard/>
    <div className="space-y-10">
      {/* Upcoming Gig Section */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-[#121417] mb-2">
          Upcoming Gig
        </h2>
        <GigCard
          heading="Live Music"
          title="Indie Night with The Twilight Harmonies"
          subtitle="Friday, July 12, 8:00 PM – 11:00 PM"
          text="View Details"
          image="/images/live-band.png" // replace with your actual path
        />
      </div>

      {/* Latest Booking Request Section */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-[#121417] mb-2">
          Latest Booking Request
        </h2>
        <GigCard
          heading=""
          title="Acoustic Set by Owen Bennett"
          subtitle="Requested for August 5, 7:00 PM – 9:00 PM"
          text="View Request"
          image="/images/live-band.png" 
        />
      </div>
    </div>

<InterestedArtists/>
<EngagementOverview/>
<QuickActionsAndNotifications/>
    </div>
    </main>
  )
}

export default VenueDashoard
