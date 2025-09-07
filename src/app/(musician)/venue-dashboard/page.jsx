import VenueDashoard from '@/components/VenueComponents/VenueDashoard'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "venue") {
    redirect("/");
  }
  return (
    <div>
      <VenueDashoard/>
    </div>
  )
}

export default page
