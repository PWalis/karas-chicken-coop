// "use client";
import React from "react";
import { Products } from "@/ui/shop/products";
import { ProductFilter } from "@/ui/shop/filter";
import mike_shirt1 from "@/ui/assets/mike_shirt1.jpg";
import mike_shirt2 from "@/ui/assets/mike_shirt2.jpg";
import autumn_shirt1 from "@/ui/assets/autumn_shirt1.jpg";
import autumn_shirt2 from "@/ui/assets/autumn_1.jpg";
import { ShopCarousel } from "@/ui/landingPage/components/shopCarousel";
import { SectionWrapper } from "@/ui/assets/animation/section-wrapper";
import ShopNavBar from "@/ui/shop/shopNavBar";
import Footer from "@/ui/footer/footer";
import silkie_doodle_2 from "@/ui/assets/silkie_doodle_2.png";
import { NoProducts } from "@/ui/shop/noProducts";
import { FAQ } from "@/ui/shop/FAQ";


export default function Shop() {
  return (
      <main>
      <ShopNavBar></ShopNavBar>
      <SectionWrapper>
        <div className="flex justify-center pt-10">
          <h1 className="text-5xl md:text-5xl lg:text-6xl text-center mt-20 mb-10">
            KARA'S CHICKEN COOP SHOP
          </h1>
        </div>
        <div className="flex justify-center">
          <div className="max-w-screen-md mx-2">
            <ShopCarousel
              image1={mike_shirt1}
              image2={autumn_shirt1}
              image3={autumn_shirt2}
              image4={mike_shirt2}
            ></ShopCarousel>
          </div>
        </div>

        <h2 className="text-4xl sm:text-5xl text-center justify-center mt-10 uppercase">
          Our Products
        </h2>
        <hr className=" flex justify-center items-center mt-6 border-gray-200 w-screen md:max-w-[400px] sm:mx-auto dark:border-gray-700" />
         <NoProducts></NoProducts>
        <ProductFilter></ProductFilter>
        <div className="block justify-center sm:grid sm:grid-cols-6">
          <div className="flex justify-center pt-5 sm:pt-2 sm:col-start-2 sm:col-span-4"> 
            <Products />
          </div>
        </div>
        <hr className=" flex justify-center items-center mt-6 border-gray-200 w-screen md:max-w-[400px] sm:mx-auto dark:border-gray-700" />
        <h2 className="text-5xl text-center mb-10 uppercase mt-10 "> COMMON SHOP FAQ </h2>
        <div className="flex justify-center">
          <div className="max-w-screen-md mb-20 mx-2">
            <FAQ></FAQ>
          </div>
        </div>
        </SectionWrapper>
        <Footer></Footer>
      </main>
  );
}
