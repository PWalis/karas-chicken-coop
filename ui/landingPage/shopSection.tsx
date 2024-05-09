"use client";
import { SectionWrapper } from "../assets/animation/section-wrapper";
import mike_shirt1 from "../assets/mike_shirt1.jpg"
import mike_shirt2 from "../assets/mike_shirt2.jpg"
import autumn_shirt1 from "../assets/autumn_1.jpg"
import autumn_shirt2 from "../assets/autumn_shirt1.jpg"
import { ShopCarousel } from "./components/shopCarousel";
export default function ShopSection() {
  return (
    <SectionWrapper>
      <section
        id="ShopSection"
        className="justify-center text-center px-4 py-8 mx-auto max-w-screen-lg"
      >
        <h2 className="text-4xl md:text-5xl lg:text-8xl uppercase justify-center text-center mb-5 mt-20 ">
          Shop Our Newest Styles
        </h2>
        <div className="flex justify-center">
          <div className="mx-auto">
          <ShopCarousel image1={mike_shirt1} image2={autumn_shirt1} image3={autumn_shirt2} image4={mike_shirt2}></ShopCarousel>
          </div>
        </div>

        <SectionWrapper>
            <a href="/shop">
          <button
            className="uppercase text-4xl bg-floc-gray hover:bg-floc-gray/90 text-white px-6 py-4 mt-4"
            role="button"
          >
            <span className="text">Visit The Shop</span>
          </button>
          </a>
        </SectionWrapper>
      </section>
    </SectionWrapper>
  );
}
