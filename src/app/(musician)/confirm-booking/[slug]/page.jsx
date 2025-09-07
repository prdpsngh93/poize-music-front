import ConfirmBookingPage from "@/components/ContributorComponent/ConfirmBooking";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "contributer") {
    redirect("/");
  }

  return (
    <div>
      <ConfirmBookingPage />
    </div>
  );
};

export default page;
