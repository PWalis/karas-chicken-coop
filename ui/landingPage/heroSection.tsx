"use client";
import { HeroCTA } from "../header/buttons";
import Image from "next/image";
import barnhouseraster from "../assets/barnhouseraster.png";
import { SectionWrapper } from "../assets/animation/section-wrapper";
import { useState, useEffect } from "react";


export default function HeroSection() {
  const [isLoading, setIsLoading] = useState(true);

    // Function to handle content load event
    const handleContentLoad = () => {
      setIsLoading(false);
    };

  // Effect to trigger handleContentLoad once the component has mounted
  useEffect(() => {
    handleContentLoad();
  }, []);

  return (
    <SectionWrapper>
      <section id="HeroSection">
      <div className="grid max-w-screen-xl h-screen md:px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-10 lg:grid-cols-12 place-content-center">
        <div className="mr-auto lg:place-self-center lg:col-span-6 sm:text-left text-center place-items-center">
          <h1 className="max-w-2xl  text-5xl lg:text-7xl xl:text-8xl font-extrabold leading-none uppercase tracking-widest">
          Welcome to the Coop!
          </h1>
           <h2 className="max-w-2xl font-light text-gray-500 lg:mb-2 md:text-xl lg:text-2xl dark:text-gray-400 tracking-widest">
              Kara's Chicken Coop
            </h2>
          <h3 className="max-w-2xl mb-4 font=light text-gray-400 lg:mb-6">
            Where every chicken is special.
          </h3>
          <HeroCTA />
        </div>
        <div className="mt-0 lg:col-span-6 lg:order-last flex w-auto order-first max-w-[600px] just">
            <div className="mt-0 lg:col-span-6 lg:order-last flex w-auto order-first max-w-[600px]">
          <Image
            src={barnhouseraster}
            alt="Barnhouse Hero Section"
            width={1000}
            height={1000}
          />
            </div>
        </div>
      </div>
      </section>
      </SectionWrapper>
  );
}
