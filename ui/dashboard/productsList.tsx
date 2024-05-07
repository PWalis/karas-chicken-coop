import React from "react";
import { fetchAllProducts } from "@/app/lib/actions";
import { Product } from "./product";

export const ProductsList: React.FC = async () => {
  const products = (await fetchAllProducts()) as any;
  return (
    <div className="flex flex-col gap-4">
      {products.map((product: any) => {
        return (
          <Product
            productId={product.id}
            name={product.name}
            price={product.priceInCents}
            description={product.description}
            primaryImage={product.primaryImage}
            category={product.category.name}
            inventory={product.inventory}
            key={product.id}
          />
        );
      })}
    </div>
  );
};
