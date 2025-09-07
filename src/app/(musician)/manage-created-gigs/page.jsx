import ManagedCreatedGigs from "@/components/ContributorComponent/ManagedCreatedGigs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "contributer") {
    redirect("/");
  }
  return (
    <div>
      <ManagedCreatedGigs />
    </div>
  );
};

export default page;
