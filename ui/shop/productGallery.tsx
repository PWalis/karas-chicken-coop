"use client";
import React from "react";
import Image from "next/image";

interface ProductGalleryProps {
  primaryImage: string;
  images: string[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  primaryImage,
  images,
}) => {
  const data = images.map((imagelink) => {
    return { imagelink };
  });

  const [active, setActive] = React.useState(
    primaryImage
  );

  return (
    <div className="grid gap-4 max-w-[700px]">
      <div>
        <Image
          width={700}
          height={480}
          className="min-h-[295px] w-full max-w-[700px] rounded-lg object-cover object-center md:h-[600px]"
          src={active}
          alt=""
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div key="primaryImage">
          <Image
            width={128}
            height={128}
            onClick={() => setActive(primaryImage)}
            src={primaryImage}
            alt="primaryImage"
            className="h-20 lg:h-32 max-w-full cursor-pointer rounded-lg object-cover object-center"
          />
        </div>
        {data.map(({ imagelink }, index) => (
          <div key={index}>
            <Image
              width={128}
              height={128}
              onClick={() => setActive(imagelink)}
              src={imagelink}
              className="h-20 lg:h-32 max-w-full cursor-pointer rounded-lg object-cover object-center"
              alt="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
