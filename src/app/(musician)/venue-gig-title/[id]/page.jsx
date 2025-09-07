import VenueGigTitle from '@/components/VenueComponents/VenueGigTitle'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "venue") {
    redirect("/");
  }
  return (
    <div>
      <VenueGigTitle/>
    </div>
  )
}

export default page
