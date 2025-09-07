import BookingConfirmation from '@/components/VenueComponents/BookingConfirmation'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "venue") {
    redirect("/");
  }
  return (
    <div>
      <BookingConfirmation/>
    </div>
  )
}

export default page
