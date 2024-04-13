

import { ShopCarousel } from "./components/shopCarousel";
export default function ShopSection() {
    return (
<section className="justify-center text-center px-4 py-8 mx-auto">
<h2 className="text-4xl md:text-5xl lg:text-7xl uppercase justify-center text-center mb-5 ">Shop Our Newest Styles</h2>
        <div className="flex justify-center"> 
            <ShopCarousel></ShopCarousel>
        </div>
<button className="uppercase text-4xl bg-floc-gray text-white px-6 py-4 mt-4" role="button"><span className="text">Visit The Shop</span></button>

</section>
    );
  }