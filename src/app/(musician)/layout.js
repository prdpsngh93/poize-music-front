import NavbarMusician from "@/components/MusicianPageComponents/NavbarMusician";
import { cookies } from "next/headers";

export default async function MusicianLayout({ children }) {

  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  const isLoggedIn = !!token;
  return (
    <>
      <NavbarMusician isLoggedIn={isLoggedIn} />
      <main className="flex-grow bg-white">{children}</main>
    </>
  );
}