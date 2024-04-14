"use client";
import corn from "../assets/corn_cutout_illustration-01.png";
import Image from "next/image";
import pengu from "../assets/pengu.jpg";
import { SectionWrapper } from "../assets/animation/section-wrapper";
/**
 * Renders a section with a grid of images showcasing chickens.
 * This component is used on the landing page to display a visual representation of chickens.
 */
export default function ChickenSection() {
  return (
    <SectionWrapper>
    <section className="justify-center w-screen lg:px-4 lg:py-8 h-screen place-content-center">
      <h2 className="text-4xl md:text-5xl lg:text-7xl uppercase justify-center text-center mb-5 lg:mb-20">
        Meet The Chickens
      </h2>
      <div className="flex flex-col lg:flex-row gap-10 w-10/12 max-w-screen-xl mx-auto">
        <div className="grid gap-4">
          <div className="w-full">
            <Image
              className="h-auto max-w-full rounded-lg"
              src={pengu}
              alt=""
            />
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div>
              <Image
                className="h-auto max-w-full rounded-lg"
                width={300}
                height={400}
                src={pengu}
                alt=""
              />
            </div>
            <div>
              <Image
                className="h-auto max-w-full rounded-lg"
                width={300}
                height={400}
                src={pengu}
                alt=""
              />
            </div>
            <div>
              <Image
                className="h-auto max-w-full rounded-lg"
                width={300}
                height={400}
                src={pengu}
                alt=""
              />
            </div>
            <div>
              <Image
                className="h-auto max-w-full rounded-lg"
                width={300}
                height={400}
                src={pengu}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="items-center lg:my-12 lg:mx-4">
          <h3 className="text-3xl lg:text-4xl mb-2 ">Pengu, </h3>
          <p className="max-w-[400px] lg:text-xl lg:max-w-[600px]"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus aut eius id iusto, voluptas numquam similique alias eligendi temporibus vitae accusantium quos ea quisquam impedit at, ab obcaecati. Magni, similique?</p>
        </div>
      </div>
    </section>
    </SectionWrapper>
  );
}
