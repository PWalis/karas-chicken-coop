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
      <div className="grid max-w-screen-2xl h-screen md:px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-10 lg:grid-cols-12 place-content-center">
        <div className="mr-auto lg:place-self-center lg:col-span-6 sm:text-left text-center place-items-center">
          <h1 className=" text-5xl lg:text-7xl xl:text-9xl font-extrabold leading-none uppercase tracking-wider">
          Welcome to the Coop!
          </h1>
           <h2 className="max-w-2xl font-light text-floc-gray lg:mb-2 md:text-xl lg:text-2xl dark:text-gray-400 tracking-wider uppercase">
              Kara's Chicken Coop
            </h2>
            <div className="flex mt-8 gap-3">
          <HeroCTA />
          <button className="inline-flex items-center justify-center px-5 py-2 text-xl text-center text-white tracking-wide bg-floc-gray hover:bg-floc-gray/90 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-md uppercase"> SHOP STYLES </button>
          </div>
        </div>
        <div className="mt-0 lg:col-span-6 lg:order-last flex w-auto order-first max-w-[800px] just">
            <div className="mt-0 lg:col-span-6 lg:order-last flex w-auto order-first max-w-[800px]">
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
