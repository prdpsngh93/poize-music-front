import ContributorDashboard from "@/components/ContributorComponent/ContributorDashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "contributer") {
    redirect("/");
  }

  return (
    <div>
      <ContributorDashboard />
    </div>
  );
};

export default page;
