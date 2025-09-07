import MusicLoverDashboard from '@/components/MusicLoverComponents/MusicLoverDashboard'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "music_lover") {
    redirect("/");
  }
  return (
    <div>
      <MusicLoverDashboard/>
    </div>
  )
}

export default page
