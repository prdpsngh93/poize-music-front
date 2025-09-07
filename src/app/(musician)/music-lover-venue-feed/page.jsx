import UpdatesMain from '@/components/MusicLoverComponents/UpdatesMain'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "music_lover") {
    redirect("/");
  }
  return (
    <div>
      <UpdatesMain/>
    </div>
  )
}

export default page
