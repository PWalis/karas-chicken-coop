"use client";
import Cassidy from "../assets/cassidy_1.jpg";
import Kara from "../assets/kara_1.jpg";
import Joshua from "../assets/joshua_headshot.jpg";
import Autumn from "../assets/autumn-headshot.jpg";
import Mike from "../assets/mike_headshot.jpg";
import { FlockCard } from "./components/ourFlockCard";
import { SectionWrapper } from "../assets/animation/section-wrapper";

export default function OurFlockSection() {
  return (
    <SectionWrapper>
    <section id="OurFlock" className="justify-center lg:px-4 py-8 mx-auto h-auto">
      <h2 className="text-6xl lg:text-8xl uppercase justify-center text-center mt-20">
        Our Flock
      </h2>
      <div className="flex overflow-x-auto 3xl:justify-center gap-4 lg:gap-10 pt-10">
        <div className="pl-8">
          <FlockCard
            src={Kara}
            alt={"Kara Leino"}
            name={"Kara"}
            description={
              "is the founder of Kara's Chicken Coops! She found her love for chickens when she first started her own farm in 2021. Ever since she has become a specialist in the polish chicken breed."
            }
          />
        </div>
        <div>
          <FlockCard
            src={Mike}
            alt={"Michael Leino"}
            name={"Michael"}
            description={
              "is Kara's husband, and hand around the farm. He mostly tends to the cows as well as other farm animals, but he also enjoys helping out with the chickens and has a deep love for all animals!"
            }
          />
        </div>
        <div>
          <FlockCard
            src={Autumn}
            alt={"Autumn Rose"}
            name={"Autumn"}
            description={
              "is Kara's daughter, and has always had a deep love for animals. She has a passion for horses, while she owns two of them and is always looking for a new one to take home!"
            }
          />
        </div>
        <div>
          <FlockCard
            src={Joshua}
            alt={"Joshua Pennartz"}
            name={"Joshua"}
            description={
              "is Kara's son, who has just as much love for chickens as Kara. He builds professional chicken coops and is always looking for new ways to make a difference in the community."
            }
          />
        </div>
        <div className="pr-8">
          <FlockCard
            src={Cassidy}
            alt={"Cassidy Pennartz"}
            name={"Cassidy"}
            description={
              "is Joshua's wife, and is the best friend of Kara and Joshua. She has a deep love for chickens as well as other farm animals, and is always looking for ways to help out."
            }
          />
        </div>

      </div>
    </section>
    </SectionWrapper>
  );
}
