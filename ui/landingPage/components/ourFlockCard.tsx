import barnhouseraster from "../../assets/barnhouseraster.png";
import Image from "next/image";

interface Props {
  src: any;
  alt: string;
  name: string;
  description: string;
}

export function FlockCard({ src, alt, name, description }: Props) {
  return (
    <div className="max-w-[300px]">
    <div className="group"> 
      <a href="#">
        <div className="">
          <Image
            src={src}

            alt={alt}
            className="object-cover w-full h-80 rounded-lg"
          />
        </div>
      </a>
      
      <div className="p-5 ease-in transition-opacity duration-300">
        <a href="#">
          <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name},
          </h4>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
  {description}
        </p>
        </div>
      </div>
      </div>
  );
}
