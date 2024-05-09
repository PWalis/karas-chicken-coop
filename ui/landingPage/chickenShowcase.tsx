"use client";
import Image, { StaticImageData } from "next/image";
import pengu from "../assets/pengu.jpg";
import river from "../assets/FamilyGallery/river.jpg";
import bonnie_3 from "../assets/FamilyGallery/bonnie_3.jpg";
import skeet from "../assets/FamilyGallery/skeet_1.jpg";
import corn from "../assets/FamilyGallery/corn_2.jpg";
import fiona from "../assets/FamilyGallery/fiona.jpg";
import crunch from "../assets/FamilyGallery/crunch.jpg";
import bean from "../assets/FamilyGallery/bean_1.jpg";
import { SectionWrapper } from "../assets/animation/section-wrapper";
import { useState } from "react";

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
  const [showImage, setShowImage] = useState<boolean>(true); // State to control image visibility
  const [isFading, setIsFading] = useState<boolean>(false); // State to control fading effect


  const handleThumbnailClick = (chicken: Chicken) => {
    setIsFading(true); // Start fading out the image
    setTimeout(() => {
      setMainImage(chicken.image);
      setChickenName(chicken.name);
      setChickenDescription(chicken.description);
      setIsFading(false); // Start fading in the new image
    }, 200); // Wait for the fade-out transition to complete
  };

  

  const chickens: Chicken[] = [
    { name: "Cornelius", description: "Cornelius was the first rooster to join the hall of fame and go viral on facebook! He loves flying in the snow and many akin him to a snowy barn owl. He stands proud as a barred candy corn polish rooster..", image: corn },
    { name: "Bonnie", description: "Bonnie has his name because Kara originally thought he was a hen! Bonnie quickly stole the hearts of everyone watching and became a star (and a house rooster!) we love our Bo! ", image: bonnie_3 },
    { name: "Skeet", description: "Skeet became famous through his videos of running towards the camera when he is called. He has probably the loudest crow of all of the Kara's Chicken Coop Roosters! He is a lovable, loud, goofy, proud polish rooster.", image: skeet },
    { name: "Pengu", description: "Pengu, one of the runner ups in the flock! Pengu is known for his sassy emo styled hair, long legs and lovable personality. He is beautiful and very large! He is a tolblunt polish rooster.", image: pengu },
    { name: "Bean", description: "Bean is loved for her adorable face and beard, she has a beautiful crest of feathers. She loves to follow you around in hopes that you will hopefully drop her a piece of your delicious food!", image: bean },
    { name: "Fiona", description: "Fiona (our househen!) is an adorable barred polish hen. She is Bonnies main girl, likes to cuddle in your chair and lay eggs where you least expect them!", image: fiona },
    { name: "Crunch", description: "Crunch is related to Mr. Frizzle (one of the original chickens!), he is a candy corn frizzle. Crunch is the coopb guard dog, and will attack anyone and anything that makes their way through to his hens. ", image: crunch },
    { name: "River", description: "River was a tiny bantam siverlace whom would follow you around the yard as if you were one of his hens. He was a rooster that we all held close to our hearts, unfortunatly passing away too soon. We will always remember you River!", image: river },
  ];
  const [mainImage, setMainImage] = useState<StaticImageData>(
    chickens[0].image
  );
  const [chickenName, setChickenName] = useState<string>(chickens[0].name);
  const [chickenDescription, setChickenDescription] = useState<string>(
    chickens[0].description
  );

  return (
    <SectionWrapper>
    <section id={"MeetTheChickens"} className="max-w-[1500px] lg:px-4 py-8 mx-auto px-4 justify-center h-auto">
      <h2 className="text-4xl md:text-5xl lg:text-8xl uppercase text-center mb-5 mt-20 lg:mb-20">
        Meet The Chickens
      </h2>
      <div className="flex flex-col lg:flex-row lg:gap-4">
        {/* Container for the main image */}
        <div className="w-full lg:w-3/4">
          <div className="w-full">
            <Image
              id="mainImageContainer"
              className="h-[400px] md:h-[600px] w-full rounded-lg object-fill object-top"
              src={mainImage}
              quality={80}
              alt=""
              style={{                  objectFit: "cover",
              opacity: isFading ? 0 : 1, // Fade out or in based on isFading state
              transition: "opacity 2s ease-out" }}
            />
          </div>
        </div>
        {/* Container for the name, description, and thumbnails */}
        <div className="flex flex-col-reverse lg:flex-col lg:w-1/2 justify-around">
          <div className="items-center mx-4 pt-4 lg:pt-0 lg:mx-0">
            <SectionWrapper>
            <h3 id="ChickenName" className="text-3xl lg:text-5xl mb-2">
              {chickenName},
            </h3>
            <p
              id="ChickenDescription"
              className="max-w-[400px] text-xl lg:text-xl lg:max-w-[450px] h-[200px] text-floc-gray/90"
            >
              {chickenDescription}
            </p>
            </SectionWrapper>
          </div>
          <div
            id="thumbnailContainer"
            className="flex overflow-x-auto gap-2 mt-2 lg:mt-0 lg:grid lg:grid-cols-4 md:gap-4 cursor-pointer"
          >
            {chickens.map((chicken, index) => (
              <div key={index}>
                <Image
                  className="thumbnail h-[108px] w-full max-w-full min-w-[100px] lg:min-w-[90px] rounded-lg object-top"
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
      </div>
    </section>
  </SectionWrapper>
  );
}
