import CreateGigForm from "@/components/ContributorComponent/CreateGigForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "contributer") {
    redirect("/");
  }
  return (
    <div>
      <CreateGigForm />
    </div>
  );
};

export default page;
