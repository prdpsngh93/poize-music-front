import { Poppins, Anton, Roboto } from "next/font/google";
import "@/app/globals.css";
import Footer from "@/components/GlobalComponents/Footer";
import { Toaster } from 'sonner';
import ClientWrapper from "@/components/GlobalComponents/ClientWrapper";
import { AppProvider } from "@/context/AppContext";
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Music App",
  description: "Music app description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body
        className={`${poppins.variable} ${roboto.variable} ${anton.variable} antialiased`}
      >
        <AppProvider>
        <ClientWrapper>
          <div className="flex flex-col min-h-screen">
            {children}
            <Footer />
          </div>
        </ClientWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
