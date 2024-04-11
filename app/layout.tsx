import type { Metadata } from "next";
import { Josefin_Sans, Londrina_Solid } from "next/font/google";
import "./globals.css";
import NavBar from "@/ui/header/navbar";
import heroSection from "@/ui/landingPage/heroSection";
import HeroSection from "@/ui/landingPage/heroSection";
import ChickenSection from "@/ui/landingPage/chickenShowcase";

export const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})
 
export const londrina = Londrina_Solid({
  weight: ['400', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Kara's Chickens",
  description: "Landing page for Kara's Chickens facebook page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={londrina.className}>
        <div>
          <NavBar></NavBar>
          <div className={londrina.className}>
          <HeroSection></HeroSection>
          </div>
          <div>
            <ChickenSection></ChickenSection>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
