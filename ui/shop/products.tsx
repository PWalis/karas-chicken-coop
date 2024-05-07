
import React, { use } from "react";
import { ItemCard } from "./itemCard";
import { fetchAllProducts } from "@/app/lib/actions";
import { formatCurrency } from "@/app/lib/utils";
import { NoProducts } from "./noProducts";



const Products: React.FC = async() => {
    const products = (await fetchAllProducts()) as any;
    console.log(products);
  
  if (products.length > 0) {
    var productsList = products.map((product: any) => (
      <ItemCard key={product.id} product={product} />
    ));}
  
    return (
      <div>
        {products.length > 0 ? (
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 sm:pt-5">
            {productsList}
          </div>
        ) : (
          <NoProducts />
        )}
      </div>
    );
  };
  
  export default Products;
