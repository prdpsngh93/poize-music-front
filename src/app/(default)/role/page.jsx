import Hero from "@/components/GlobalComponents/Hero";
import MeetOurArtistsTwo from "@/components/HomePageComponents/MeetOurArtistsTwo";
import RoleSelection from "./RoleSelection";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Role = async () => {
  const cookieStore = await cookies();
  const userData = cookieStore.get("userData")?.value;
const  userRole = cookieStore.get("userRole")?.value

  let role = null;
  if (userData) {
    try {
      const parsedUserData = JSON.parse(userData);
      role = parsedUserData.role;
    } catch (error) {
      console.error("Error parsing userData cookie:", error);
    }
  }

  if (role === "" || role === null) {
    redirect("/");
  }
  return (
    <div className="bg-[#F1F0EA]">
      <Hero title={"Choose Your Role"} />
      <section className="container mx-auto px-4  md:px-9 lg:px-12   py-8 md:py-16 ">
        <RoleSelection />
        <MeetOurArtistsTwo />
      </section>
      {/* <Footer/> */}
    </div>
  );
};
export default Role;
