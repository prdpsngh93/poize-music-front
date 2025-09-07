import MyEvents from "@/components/MusicLoverComponents/MyEvents";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "music_lover") {
    redirect("/");
  }
  return (
    <div>
      <MyEvents />
    </div>
  );
};

export default page;
