"use client";
import Image from "next/image";
import pengu from "../assets/FamilyGallery/pengu.jpg";
import river from "../assets/FamilyGallery/river.jpg";
import bonnie1 from "../assets/FamilyGallery/bonnie_1.jpg";
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
import frizzle1 from "../assets/FamilyGallery/frizzle1.jpg";
import whitechick from "../assets/FamilyGallery/whitechick.jpg"
import lucy from "../assets/FamilyGallery/lucy.jpg"
import peacock from "../assets/FamilyGallery/peacock.jpg"
import penguemo from "../assets/FamilyGallery/penguemo.jpg"
import river2 from "../assets/FamilyGallery/river_2.jpg"
import bean2 from "../assets/FamilyGallery/bean_2.jpg"

import chicks_3 from "../assets/FamilyGallery/chicks_3.jpg";
import { FamilyGallery } from "./components/familyGallery";
import { SectionWrapper } from "../assets/animation/section-wrapper";
import FacebookIcon from "../assets/icons/Facebook-icon";
import InstagramIcon from "../assets/icons/Instagram-icon";
import YoutubeIcon from "../assets/icons/Youtube-icon";

export default function BecomeFamilySection() {
  return (
    <SectionWrapper>
      <section id={"BecomeFamilySection"} className="justify-center px-4 py-8 mx-auto max-w-[1400px]">
        <h2 className="text-4xl md:text-5xl lg:text-7xl uppercase justify-center text-center mb-5 lg:mb-10">
          Become Part Of Our Family
        </h2>
        <div className="justify-between mx-auto">
          <div className="mb-5">
            <FamilyGallery
              src1={bonnie1}
              alt1={"bonnie"}
              src2={rocky}
              alt2={"rocky"}
              src3={hen_2}
              alt3={"hen"}
              src4={cowboy}
              alt4={"chicken in cowboy hat"}
              src5={penguemo}
              alt5="pengu"
              src6={river2}
              alt6="river"
              src7={bean}
              alt7="bean"
              src8={chicks_3}
              alt8="chicks"
              src9={hen_1}
              alt9={"hen"}
              src10={whitechick}
              alt10="white chick"
              src11={bean2}
              alt11="bean"
              src12={americauna}
              alt12="americauna"
              src13={frizzle1}
              alt13="frizzle"
              src14={hen_2}
              alt14="hen"
              src15={silkies}
              alt15="silkies"
              src16={chicks_1}
              alt16="chicks"
              src17={peacock}
              alt17="peacock"
              src18={lucy}
              alt18="lucy"
            ></FamilyGallery>
          </div>
          <div className=" flex justify-center place-self-center gap-10 ">
            <a href="#">
              <FacebookIcon className="h-[90px] w-[90px] lg:h-[100px] lg:w-[100px] mb-6 text-floc-gray group"></FacebookIcon>
            </a>
            <a href="#">
              <InstagramIcon className="h-[90px] w-[90px] lg:h-[100px] lg:w-[100px] mb-6"></InstagramIcon>
            </a>
            <a href="#">
              <YoutubeIcon className="h-[90px] w-[90px] lg:h-[100px] lg:w-[100px] mb-6"></YoutubeIcon>
            </a>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
