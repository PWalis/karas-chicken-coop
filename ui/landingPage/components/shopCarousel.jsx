"use client";
import { Carousel } from "@material-tailwind/react";
import image1 from "../../assets/autumn_1.jpg";
import image2 from "../../assets/mike_shirt1.jpg";
import image3 from "../../assets/mike_shirt2.jpg";
import image4 from "../../assets/autumn_shirt1.jpg";

export function ShopCarousel() {
  return (
    <Carousel loop={true} autoplay={true} autoplayDelay={3000} transition={{ duration: .75 }} className="rounded-xl">
      <img
        src={image4.src}
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src={image2.src}
        alt="image 2"
        className="h-[600-px] w-full object-cover"
      />
      <img
        src={image3.src}
        alt="image 3"
        className="h-full w-full object-cover"
      />
            <img
        src={image1.src}
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}