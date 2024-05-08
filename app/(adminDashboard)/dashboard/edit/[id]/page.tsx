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

  return (
    <div className="flex flex-col w-screen h-fit min-h-screen">
      <h2 className="flex text-4xl  mb-10 mt-28 text-center uppercase justify-center">
        Edit Product:
      </h2>
      <div className="flex justify-center items-center">
      <EditProductForm
        productId={product.id}
        name={product.name}
        description={product.description}
        price={product.priceInCents}
        primaryImage={product.primaryImage}
        inventory={product.inventory}
        category={product.category.name}
        images={product.images}
        categories={categories}
      />
    </div>
    </div>
  );
}
