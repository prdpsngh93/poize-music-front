import NavbarMusician from "@/components/MusicianPageComponents/NavbarMusician";

export default function MusicianLayout({ children }) {


  return (
    <>
      <NavbarMusician />
      <main className="flex-grow bg-white">{children}</main>
    </>
  );
}