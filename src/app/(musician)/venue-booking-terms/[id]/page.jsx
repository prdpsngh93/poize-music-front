import BookingTerms from '@/components/VenueComponents/BookingTerms'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "venue") {
    redirect("/");
  }
  return (
    <div>
      <BookingTerms/>
    </div>
  )
}

export default page
