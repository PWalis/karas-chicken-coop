
import { FlockCard } from "./components/ourFlockCard";

export default function OurFlockSection() {
    return (
<section className="justify-center text-center px-4 py-8 mx-auto">
<h2 className="text-4xl md:text-5xl lg:text-7xl uppercase justify-center text-center mb-20">Our Flock</h2>
<div className="flex flex-wrap justify-center gap-4">
    <div> <FlockCard/></div>
    <div> <FlockCard/></div>
    <div> <FlockCard/></div>
    <div> <FlockCard/></div>
    <div> <FlockCard/></div>

</div>
</section>
    );
  }