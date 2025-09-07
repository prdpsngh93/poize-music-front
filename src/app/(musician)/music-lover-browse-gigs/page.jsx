import BrowseGigs from '@/components/MusicLoverComponents/BrowseGigs'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
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

 if (role !== "music_lover" && userRole !== "music_lover") {
    redirect("/");
  }
  return (
    <div>
      <BrowseGigs/>
    </div>
  )
}

export default page
