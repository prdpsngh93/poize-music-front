import VenueProfileForm from '@/components/VenueComponents/VenueProfileForm'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "venue") {
    redirect("/");
  }
  return (
    <div>
      <VenueProfileForm/>
    </div>
  )
}

export default page
