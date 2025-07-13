import Navbar from "./Navbar";
import Footer from "./Footer";
import { cookies } from 'next/headers';

const Layout = async ({ children }) => {
  const cookieStore = await  cookies(); // 
  const token = cookieStore.get('token');
  const isLoggedIn = !!token;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
        <main className="flex-grow bg-white">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;