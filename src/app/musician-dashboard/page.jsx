import UpcomingGigs from '@/components/MusicianDashboardComponents/UpcomingGigs'
import React from 'react'
import NavbarMusician from '@/components/MusicianPageComponents/NavbarMusician'
import ProfileStats from '@/components/MusicianDashboardComponents/ProfileStats'
import RecentActivity from '@/components/MusicianDashboardComponents/RecentActivity'
import Announcements from '@/components/MusicianDashboardComponents/Annoucement'
import Analytics from '@/components/MusicianDashboardComponents/Analytics'

const page = () => {
    return (
        <>
            <NavbarMusician />
            <main className="bg-[#f4f3ee] min-h-screen px-4 md:px-9 lg:px-12 py-10">
                <div className="max-w-5xl mx-auto flex flex-col gap-10">
                    {/* Heading */}
                    <div className="text-left">
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Welcome back, Emily!</h1>
                        <p className="text-sm md:text-base text-gray-600 mt-1">
                            Here's a snapshot of your music journey.
                        </p>
                    </div>
                    <UpcomingGigs />
                    <ProfileStats/>
                    <RecentActivity/>
                    <Announcements/>
                    <Analytics/>
                </div>
            </main>
        </>
    )
}

export default page
