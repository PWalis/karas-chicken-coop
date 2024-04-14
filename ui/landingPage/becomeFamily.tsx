"use client";
import FacebookIcon from "../assets/svgs/facebook_icon";
import corn from "../assets/corn_cutout_illustration-01.png";
import Image from "next/image";
import pengu from "../assets/FamilyGallery/pengu.jpg";
import river from "../assets/FamilyGallery/river.jpg";
import americauna from "../assets/FamilyGallery/americauna.jpg";
import bean from "../assets/FamilyGallery/bean_1.jpg";
import silkies from "../assets/FamilyGallery/silkies.jpg";
import skeet_1 from "../assets/FamilyGallery/skeet_1.jpg";
import cowboy from "../assets/FamilyGallery/cowboy.jpg";
import hen_1 from "../assets/FamilyGallery/hen_1.jpg";
import rocky from "../assets/FamilyGallery/rocky.jpg";
import chicks_1 from "../assets/FamilyGallery/chicks_1.jpg";
import corn_2 from "../assets/FamilyGallery/corn_2.jpg";
import hen_2 from "../assets/FamilyGallery/hen_2.jpg";
import chicks_3 from "../assets/FamilyGallery/chicks_3.jpg"
import { FamilyGallery } from "./components/familyGallery";
import { SectionWrapper } from "../assets/animation/section-wrapper";
export default function BecomeFamilySection() {
  return (
    <SectionWrapper>
    <section className="justify-center text-center px-4 py-8 mx-auto max-w-screen-xl">
      <h2 className="text-4xl md:text-5xl lg:text-7xl uppercase justify-center text-center mb-5 lg:mb-20">
        Become Part Of Our Family
      </h2>
      <FamilyGallery
        src1={corn_2}
        alt1={"pengu"}
        src2={hen_2}
        alt2={"river"}
        src3={rocky}
        src4={cowboy}
        src5={river}
        src6={chicks_1}
        src7={bean}
        src8={chicks_3}
        src9={hen_1}
        src10={skeet_1}
        src11={silkies}
        src12={americauna}
      ></FamilyGallery>
    </section>
    </SectionWrapper>
  );
}
