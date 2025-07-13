import Hero from "@/components/GlobalComponents/Hero"
import MeetOurArtists from "@/components/HomePageComponents/MeetOurArtists"
import MeetOurArtistsTwo from "@/components/HomePageComponents/MeetOurArtistsTwo"
import RoleSelection from "./RoleSelection"

const Role = () => {
    return (
        <div className="bg-[#F1F0EA]">
        <Hero />
         <section className="container mx-auto px-4  md:px-9 lg:px-12   py-8 md:py-16 ">
            <RoleSelection/>
        <MeetOurArtistsTwo/>
        </section>
        </div>
    )
}
export default Role