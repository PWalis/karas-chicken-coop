"use client";
import Cassidy from "../assets/cassidy_1.jpg";
import Kara from "../assets/kara_1.jpg";
import Joshua from "../assets/joshua_1.jpg";
import Autumn from "../assets/autumn_1.jpg";
import { FlockCard } from "./components/ourFlockCard";
import { SectionWrapper } from "../assets/animation/section-wrapper";

export default function OurFlockSection() {
  return (
    <SectionWrapper>
    <section className="justify-center px-4 py-8 mx-auto h-auto">
      <h2 className="text-4xl md:text-5xl lg:text-7xl uppercase justify-center text-center mb-5 lg:mb-20">
        Our Flock
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        <div>
          {" "}
          <FlockCard
            src={Kara}
            alt={"Kara Pennartz"}
            name={"Kara"}
            description={
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum aut possimus, itaque fugit modi quas deserunt iure ipsam tempore rem id voluptate delectus, ab, suscipit quibusdam velit debitis magnam! Libero!"
            }
          />
        </div>
        <div>
          {" "}
          <FlockCard
            src={Cassidy}
            alt={"Cassidy Pennartz"}
            name={"Cassidy"}
            description={
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum aut possimus, itaque fugit modi quas deserunt iure ipsam tempore rem id voluptate delectus, ab, suscipit quibusdam velit debitis magnam! Libero!"
            }
          />
        </div>
        <div>
          {" "}
          <FlockCard
            src={Joshua}
            alt={"Joshua Pennartz"}
            name={"Joshua"}
            description={
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum aut possimus, itaque fugit modi quas deserunt iure ipsam tempore rem id voluptate delectus, ab, suscipit quibusdam velit debitis magnam! Libero!"
            }
          />
        </div>
        <div>
          {" "}
          <FlockCard
            src={Autumn}
            alt={"Autumn Pennartz"}
            name={"Autumn"}
            description={
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum aut possimus, itaque fugit modi quas deserunt iure ipsam tempore rem id voluptate delectus, ab, suscipit quibusdam velit debitis magnam! Libero!"
            }
          />
        </div>
      </div>
    </section>
    </SectionWrapper>
  );
}
