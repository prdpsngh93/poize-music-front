import Footer from "@/components/GlobalComponents/Footer";
import Navbar from "@/components/GlobalComponents/Navbar";
import NavbarMusician from "@/components/MusicianPageComponents/NavbarMusician";
import Music404Page from "@/components/NotFound/Music404Page";

export default function NotFound() {
  return (
    <>
    <NavbarMusician/>
      <Music404Page />;
    </>
  );
}
