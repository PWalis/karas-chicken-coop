import barnhouseraster from "../../assets/barnhouseraster.png";
import Image from "next/image";
import { SectionWrapper } from "@/ui/assets/animation/section-wrapper";

interface Props {
  src: any;
  alt: string;
  name: string;
  description: string;
}

export function FlockCard({ src, alt, name, description }: Props) {
  return (
    <div className="w-[300px] mb-20">
    <div className="group"> 
      <a href="#">
        <div className="">
          <Image
            src={src}
            alt={alt}
            className="object-cover w-full h-80 rounded-[200px] drop-shadow-sm pb-2"
          />
        </div>
      </a>
      <div className="drop-shadow-lg bg-white h-[200px] rounded-lg group-hover:drop-shadow-2xl ease-in-out transition-all duration-300">
      <div className="p-5 ease-in transition-opacity duration-300">
        <SectionWrapper>
          <h4 className="mb-2 text-2xl font-bold tracking-tight text-floc-gray">
            {name},
          </h4>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
  {description}
        </p>
        </SectionWrapper>
        </div>
      </div>
      </div>
      </div>
  );
}
