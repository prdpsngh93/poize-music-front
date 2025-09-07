import BookingSummary from '@/components/VenueComponents/BookingSummary'
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

 if (role !== "venue" && userRole !== "venue") {
    redirect("/");
  }
  return (
    <div>
      <BookingSummary/>
    </div>
  )
}

export default page
