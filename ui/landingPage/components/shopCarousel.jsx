"use client";
import { Carousel } from "@material-tailwind/react";



export function ShopCarousel({ image1, image2, image3, image4 }) {
  return (
    <Carousel loop={true} autoplay={true} autoplayDelay={3000} transition={{ duration: .75 }} className="rounded-xl">
      <img
        src={image1.src}
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
        src={image4.src}
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}