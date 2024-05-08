// page to display one product and all the product pictures and details of the product

import Footer from "@/ui/footer/footer";
import { ProductGallery } from "@/ui/shop/productGallery";
import { FAQ } from "@/ui/shop/FAQ";
import ShopNavBar from "@/ui/shop/shopNavBar";
import { EditQuantityAndSize } from "@/ui/shop/editQuantityAndSize";
import { fetchProductById } from "@/app/lib/actions";
import { ProductDescription } from "@/ui/shop/productDescription";
import { NoItemWithThatId } from "@/ui/shop/noItemWithThatId";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // fetch product data
  // check for hasSize
  // if hasSize is true then render sizing component and pass setState to component to update the size
  // state will will be managed here for quantity and size
  // on add to cart click and buy now add product size and quantity to cart Context
  // buy now will add data to context then redirect to checkout page

  const product = await fetchProductById(Number(params.id));
  const sizes = {
    XS: product?.inventory?.xs_quantity,
    S: product?.inventory?.s_quantity,
    M: product?.inventory?.m_quantity,
    L: product?.inventory?.l_quantity,
    XL: product?.inventory?.xl_quantity,
    XXL: product?.inventory?.xxl_quantity,
    limit: product?.inventory?.quantity,
  };

  return (
    <main className="min-h-screen h-fit bg-white ">
      <ShopNavBar />
      <div className=" bg-gray-50 flex justify-center ">
        <div className="lg:flex h-fit place-items-center gap-20 p-2">
          {product !== null && product !== undefined ? (
            <>
              <div className="flex-col ">
                <div className="w-full h-full overflow-hidden mt-20 lg:mt-48 mb-5 lg:mb-36">
                  <ProductGallery
                    primaryImage={product?.primaryImage!}
                    images={product?.images!}
                  ></ProductGallery>
                </div>
              </div>
              <div className="flex flex-col text-center lg:text-left place-items-center lg:place-items-start">
                <ProductDescription
                  description={product?.description!}
                  name={product?.name!}
                />
                <EditQuantityAndSize
                  hasSizes={product?.inventory?.hasSizes!}
                  product={product}
                  quantityLimit={sizes}
                />
                <div className="max-w-[600px]">
                  <FAQ></FAQ>
                </div>
              </div>
            </>
          ) : (
            <NoItemWithThatId />
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
