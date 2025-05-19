import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from 'next/font/google';
import "./globals.css";



const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Choose weights you need
  variable: '--font-poppins', 
  display: 'swap', // Optional: better performance
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
  description: "Music app desciption",
};

export default function RootLayout({ children }) {
  return (
     <html lang="en" className={poppins.className}>
      <body className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
