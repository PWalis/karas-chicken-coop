import React from "react";
import { fetchProductById, fetchCategories } from "@/app/lib/actions";
import { EditProductForm } from "@/ui/dashboard/editProductForm";

export default async function EditProductPage({
  params,
}: {
  params: { id: number };
}) {
  const id = params.id;
  const product = (await fetchProductById(Number(id))) as any;
  const categories = (await fetchCategories()) as any;

  console.log(categories)

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
        categories={categories}
      />
    </div>
  );
}
