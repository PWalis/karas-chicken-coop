"use client";
import Image, { StaticImageData } from "next/image";
import pengu from "../assets/pengu.jpg";
import river from "../assets/river.jpg";
import bonnie_3 from "../assets/FamilyGallery/bonnie_3.jpg";
import skeet from "../assets/FamilyGallery/skeet_1.jpg";
import { SectionWrapper } from "../assets/animation/section-wrapper";
import { useState } from 'react';

/**
 * Renders a section with a grid of images showcasing chickens.
 * This component is used on the landing page to display a visual representation of chickens.
 */


interface Chicken {
  name: string;
  description: string;
  image: StaticImageData;
}

export default function ChickenSection() {

  const handleThumbnailClick = (chicken: Chicken) => {
      setMainImage(chicken.image);
      setChickenName(chicken.name);
      setChickenDescription(chicken.description);
  };

  const chickens: Chicken[] = [
      { name: "River", description: "Description for River.", image: river },
      { name: "Pengu", description: "Description for Pengu.", image: pengu },
      { name: "Bonnie", description: "Description for Bonnie.", image: bonnie_3 },
      { name: "Skeet", description: "Description for Skeet.", image: skeet },
  ];
  const [mainImage, setMainImage] = useState<StaticImageData>(chickens[0].image);
  const [chickenName, setChickenName] = useState<string>(chickens[0].name);
  const [chickenDescription, setChickenDescription] = useState<string>(chickens[0].description);


  return (
      <SectionWrapper>
          <section className="justify-center w-screen lg:px-4 lg:py-8 h-screen place-content-center">
              <h2 className="text-4xl md:text-5xl lg:text-7xl uppercase justify-center text-center mb-5 lg:mb-20">
                  Meet The Chickens
              </h2>
              <div className="flex flex-col lg:flex-row gap-10 w-10/12 max-w-screen-xl mx-auto">
                  <div className="grid gap-4">
                      <div className="w-full aspect-w-4 aspect-h-3">
                          <Image
                              id="mainImageContainer"
                              className="h-[600px] w-[900px] aspect-w-4 aspect-h-3 rounded-lg object-fill"
                              src={mainImage}
                              height={900}
                              width={600}
                              quality={100}
                              alt=""
                              style={{ objectFit: "cover" }}
                          />
                      </div>
                      <div id="thumbnailContainer" className="grid grid-cols-5 gap-4">
                          {chickens.map((chicken, index) => (
                              <div key={index}>
                                  <Image
                                      className="thumbnail h-[108px] w-full max-w-full min-w-[100px] rounded-lg"
                                      width={300}
                                      height={400}
                                      src={chicken.image}
                                      alt=""
                                      onClick={() => handleThumbnailClick(chicken)}
                                      style={{ objectFit: "cover" }}
                                  />
                              </div>
                          ))}
                      </div>
                  </div>
                  <div className="items-center lg:my-12 lg:mx-4">
                      <h3 id="ChickenName" className="text-3xl lg:text-4xl mb-2 ">{chickenName}</h3>
                      <p id="ChickenDescription" className="max-w-[400px] lg:text-xl lg:max-w-[600px]">{chickenDescription}</p>
                  </div>
              </div>
          </section>
      </SectionWrapper>
  );
}

