import Hero from "@/components/GlobalComponents/Hero"
import MeetOurArtists from "@/components/HomePageComponents/MeetOurArtists"
import MeetOurArtistsTwo from "@/components/HomePageComponents/MeetOurArtistsTwo"
import RoleSelection from "./RoleSelection"
import Footer from "@/components/GlobalComponents/Footer"

const Role = () => {
    return (
        <div className="bg-[#F1F0EA]">
            <Hero  title={"Choose Your Role"} />
            <section className="container mx-auto px-4  md:px-9 lg:px-12   py-8 md:py-16 ">
                <RoleSelection />
                <MeetOurArtistsTwo />
            </section>
            {/* <Footer/> */}
        </div>
    )
}
export default Role