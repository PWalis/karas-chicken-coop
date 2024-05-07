// page to display one product and all the product pictures and details of the product

import NavBar from "@/ui/header/navbar";
import Image from "next/image";
import Footer from "@/ui/footer/footer";
import autumn_shirt1 from "@/ui/assets/autumn_shirt1.jpg";
import { ProductGallery } from "@/ui/shop/productGallery";
import { FAQ } from "@/ui/shop/FAQ";
import ShopNavBar from "@/ui/shop/shopNavBar";
import { useState } from "react";
import { EditQuantityAndSize } from "@/ui/shop/editQuantityAndSize";
import { fetchProductById } from "@/app/lib/actions";
import { ProductDescription } from "@/ui/shop/productDescription";

export default async function ProductPage({ params }: { params: { id: string } }) {
  // fetch product data
  // check for hasSize
  // if hasSize is true then render sizing component and pass setState to component to update the size
  // state will will be managed here for quantity and size 
  // on add to cart click and buy now add product size and quantity to cart Context
  // buy now will add data to context then redirect to checkout page

  const product = await fetchProductById(Number(params.id))
  const sizes = {
    XS: product?.inventory?.xs_quantity,
    S: product?.inventory?.s_quantity,
    M: product?.inventory?.m_quantity,
    L: product?.inventory?.l_quantity,
    XL: product?.inventory?.xl_quantity,
    XXL: product?.inventory?.xxl_quantity,
    limit: product?.inventory?.quantity,
  }

  return (
    <main className="min-h-screen h-fit bg-white ">
      <ShopNavBar/>
      <div className=" bg-gray-50 flex justify-center ">
        <div className="lg:flex h-fit place-items-center gap-20 p-2">
          <div className="flex-col ">
            <div className="w-full h-full overflow-hidden mt-20 lg:mt-32 mb-5 lg:mb-36 px-3">
              <ProductGallery primaryImage={product?.primaryImage!} images={product?.images!}></ProductGallery>
            </div>
          </div>
            <div className="flex flex-col text-center lg:text-left place-items-center lg:place-items-start lg:mt-32">
              <ProductDescription description={product?.description!} name={product?.name!} />
              <EditQuantityAndSize hasSizes={product?.inventory?.hasSizes!} product={product} quantityLimit={sizes}/>
              <hr className="flex justify-center items-center mt-1 border-gray-200 w-screen md:max-w-[400px] sm:mx-auto dark:border-gray-700" />
              <div className="max-w-[600px] h-[400px] sm:h-[300px] text-left mb-10 mt-5 sm:mx-0 mx-4">
                <h3 className="text-3xl"> SHOP FAQ </h3>
                <FAQ></FAQ>
              </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
