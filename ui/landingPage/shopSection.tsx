

import { ShopCarousel } from "./components/shopCarousel";
export default function ShopSection() {
    return (
<section className="justify-center text-center px-4 py-8 mx-auto">
<h2 className="text-4xl md:text-5xl lg:text-7xl uppercase justify-center text-center mb-20">Shop Our Newest Styles</h2>
        <div> 
            <ShopCarousel></ShopCarousel>
        </div>
</section>
    );
  }