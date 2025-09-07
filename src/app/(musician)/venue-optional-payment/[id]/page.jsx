import OptionalPayment from '@/components/VenueComponents/OptionalPayment'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "venue") {
    redirect("/");
  }
  return (
    <div>
      <OptionalPayment/>
    </div>
  )
}

export default page
