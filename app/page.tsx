import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/ui/header/navbar";
import HeroSection from "@/ui/landingPage/heroSection";
import ChickenSection from "@/ui/landingPage/chickenShowcase";
import { londrina } from "@/ui/fonts"




export const metadata: Metadata = {
  title: "Kara's Chickens",
  description: "Landing page for Kara's Chickens facebook page",
};

export default function Home() {
  return (
    <main>
      <NavBar></NavBar>
      <div className={londrina.className}>
        <HeroSection></HeroSection>
      </div>
      <div>
        <ChickenSection></ChickenSection>
      </div>
    </main>
  );
}
