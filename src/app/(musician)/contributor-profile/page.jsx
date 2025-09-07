import ContributorProfile from "@/components/ContributorComponent/ContributorProfile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "contributer") {
    redirect("/");
  }
  return (
    <div>
      <ContributorProfile />
    </div>
  );
};

export default page;
