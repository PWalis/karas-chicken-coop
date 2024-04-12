import FacebookIcon from "../assets/svgs/facebook_icon";
import corn from "../assets/corn_cutout_illustration-01.png";
import Image from "next/image";

export default function BecomeFamilySection() {
    return (
<section className="justify-center text-center px-4 py-8 mx-auto">
<h2 className="text-4xl md:text-5xl lg:text-7xl uppercase justify-center text-center mb-20">Become Part Of Our Family</h2>
<div className="flex justify-center flex-wrap gap-10">
<div className="flex flex-wrap justify-center gap-4">
<div className="row-span-4 place-content-center"><Image src={corn}  alt="Picture of Cornelious The Rooster"
      width={500}
      height={500}/></div>
</div>
<div className="flex-col flex justify-center gap-8">  
<div> <FacebookIcon className="w-28"></FacebookIcon> </div>
<div> <FacebookIcon></FacebookIcon> </div>
<div> <FacebookIcon className="w-30"></FacebookIcon> </div>
</div>
</div>
</section>
    );
  }