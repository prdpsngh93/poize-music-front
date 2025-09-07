import BookingSummary from '@/components/VenueComponents/BookingSummary'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "venue") {
    redirect("/");
  }
  return (
    <div>
      <BookingSummary/>
    </div>
  )
}

export default page
