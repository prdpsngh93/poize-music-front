import Navbar from "@/components/GlobalComponents/Navbar";
import { cookies } from 'next/headers';

export default async function DefaultLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  const isLoggedIn = !!token;

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="flex-grow bg-white">{children}</main>
    </>
  );
}