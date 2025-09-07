import CreateMusicianProfile from '@/components/MusicianPageComponents/LoginMusician'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const role = await cookies().get("role")?.value;
  if (role !== "artist") {
    redirect("/");
  }
  return (
    <>
    <CreateMusicianProfile/>
    </>
  )
}

export default page
