import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from 'next/font/google';
import "@/app/globals.css";
import Footer from "@/components/GlobalComponents/Footer"; // Remove Layout import

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Music App",
  description: "Music app description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className={`${poppins.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}