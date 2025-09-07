import VenueCalendar from "@/components/VenueComponents/VenueCalender";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "venue") {
    redirect("/");
  }
  return (
    <div>
      <VenueCalendar />
    </div>
  );
};

export default page;
