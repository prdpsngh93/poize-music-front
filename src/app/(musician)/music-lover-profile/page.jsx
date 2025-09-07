import MusicLoverProfile from '@/components/MusicLoverComponents/MusicLoverProfile'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "music_lover") {
    redirect("/");
  }
  return (
    <div>
      <MusicLoverProfile/>
    </div>
  )
}

export default page
