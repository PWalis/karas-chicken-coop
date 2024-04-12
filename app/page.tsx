import type { Metadata } from "next";
import "./globals.css";

import HeroSection from "@/ui/landingPage/heroSection";
import ChickenSection from "@/ui/landingPage/chickenShowcase";
import OurFlockSection from "@/ui/landingPage/ourFlock";
import BecomeFamilySection from "@/ui/landingPage/becomeFamily";
import ShopSection from "@/ui/landingPage/shopSection";
import JoinTheFlock from "@/ui/landingPage/joinTheflock";
import { londrina } from "@/ui/fonts"

export const metadata: Metadata = {
  title: "Kara's Chickens",
  description: "Landing page for Kara's Chickens facebook page",
};

export default function Home() {
  return (
    <main>
      <div className={londrina.className}>
        <HeroSection></HeroSection>
      </div>
      <div>
        <ChickenSection></ChickenSection>
      </div>
      <div>
      <OurFlockSection></OurFlockSection>
      </div>
      <div> <BecomeFamilySection></BecomeFamilySection></div>
      <div> <ShopSection></ShopSection></div>
      <div> <JoinTheFlock></JoinTheFlock></div>
    </main>
  );
}
