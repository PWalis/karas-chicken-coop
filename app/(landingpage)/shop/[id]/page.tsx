// page to display one product and all the product pictures and details of the product

import NavBar from "@/ui/header/navbar";
import Image from "next/image";
import Footer from "@/ui/footer/footer";
import autumn_shirt1 from "@/ui/assets/autumn_shirt1.jpg";
import { ProductGallery } from "@/ui/shop/productGallery";
import { FAQ } from "@/ui/shop/FAQ";
import Sizing from "@/ui/shop/sizing";
import { QuantityCounter } from "@/ui/shop/quantityCounter";
import ShopNavBar from "@/ui/shop/shopNavBar";

export default function ProductPage() {
  return (
    <main className="min-h-screen h-fit bg-white ">
      <ShopNavBar />
      <div className=" bg-gray-50 flex justify-center ">
        <div className="lg:flex h-fit place-items-center gap-20 p-2">
          <div className="flex-col ">
            <div className="w-full h-full overflow-hidden mt-20 lg:mt-48 mb-5 lg:mb-36">
              <ProductGallery></ProductGallery>
            </div>
          </div>
            <div className="flex flex-col text-center lg:text-left place-items-center lg:place-items-start">
              <div className="mb-5">
                <h2 className="text-6xl mb-2">Product Title</h2>
                <h3 className="max-w-[500px]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Deleniti ullam, enim praesentium cum fugiat, soluta, debitis
                  voluptatibus possimus nobis corrupti
                </h3>
                <p className="text-floc-gray/60 pt-2">
                  material is made 60% cotton 40% polyester
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex gap-3 lg:justify-normal justify-center">
                  <Sizing></Sizing>
                </div>
                <div className="flex justify-center lg:justify-normal mt-2">
                  <QuantityCounter></QuantityCounter>
                </div>
              </div>
              <div className="flex mb-10 mt-4 gap-3 justify-center">
                <button className="px-4 py-2 w-fill bg-floc-yellow uppercase">
                  Buy Now
                </button>
                <button className="border-[.20em] border-floc-gray px-4 py-2 uppercase">
                  Add to Cart
                </button>
              </div>
              <div className="max-w-[600px]">
                <FAQ></FAQ>
              </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
