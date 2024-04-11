import corn from "../assets/corn_cutout_illustration-01.png";
import Image from "next/image";
export default function ChickenSection() {
    return (
<section className="justify-center text-center px-4 py-8 mx-auto">
<div className="grid grid-cols-3 grid-rows-5 gap-3 h-full">
        <h2 className="text-4xl md:text-5xl lg:text-7xl uppercase col-span-3 justify-center text-center">Meet The Chickens</h2>
    <div className="row-span-4 place-content-center"> 
    <Image src={corn}  alt="Picture of Cornelious The Rooster"
      width={500}
      height={500}/> </div>
    <div className="row-span-4 place-content-center"><Image src={corn}  alt="Picture of Cornelious The Rooster"
      width={500}
      height={500}/></div>
    <div className="row-span-4 place-content-center"><Image src={corn}  alt="Picture of Cornelious The Rooster"
      width={500}
      height={500}/></div>
</div>
</section>
    );
  }