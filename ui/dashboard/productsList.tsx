import React from "react";
import { fetchAllProducts } from "@/app/lib/actions";
import { Product } from "./product";

export const ProductsList: React.FC = async () => {
  const products = (await fetchAllProducts()) as any;
  // console.log(products);
  return (
    <div className="flex flex-col gap-10">
      {products.map((product: any) => {
        return (
          <Product
            productId={product.id}
            name={product.name}
            price={product.priceInCents}
            description={product.description}
            images={product.images}
            category={product.category.name}
            inventory={product.inventory}
            key={product.id}
          />
        );
      })}
    </div>
  );
};
