import React from "react";
import { fetchProductById } from "@/app/lib/actions";
import { EditProductForm } from "@/ui/dashboard/editProductForm";

export default async function EditProductPage({
  params,
}: {
  params: { id: number };
}) {
  const id = params.id;
  const product = (await fetchProductById(Number(id))) as any;

  return (
    <div className="flex justify-center w-full">
      <EditProductForm
        productId={product.id}
        name={product.name}
        description={product.description}
        price={product.priceInCents}
        inventory={product.inventory}
        category={product.category.name}
        images={product.images}
      />
    </div>
  );
}
