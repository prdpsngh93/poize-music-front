import PostGigForm from '@/components/VenueComponents/PostGigForm'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "venue") {
    redirect("/");
  }
  return (
    <div>
      <PostGigForm/>
    </div>
  )
}

export default page
