import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from 'next/font/google';
import "./globals.css";
import Layout from "@/components/GlobalComponents/Layout";

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
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
