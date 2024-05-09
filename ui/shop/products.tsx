
import React, { use } from "react";
import { ItemCard } from "./itemCard";
import { fetchAllProducts } from "@/app/lib/actions";
import { formatCurrency } from "@/app/lib/utils";
import { NoProducts } from "./noProducts";



const Products: React.FC = async() => {
    const products = (await fetchAllProducts()) as any;
  if (products.length > 0) {
    var productsList = products.map((product: any) => (
      <ItemCard key={product.id} product={product} />
    ));}
  
    return (
      <div className="flex justify-center place-content-center pt-5 mx-auto">
        {products.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4 ">
            {productsList}
          </div>
        ) : (
          <NoProducts />
        )}
      </div>
    );
  };
  
  export default Products;
