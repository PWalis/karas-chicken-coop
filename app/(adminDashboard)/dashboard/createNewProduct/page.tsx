import React from "react";
import { fetchCategories } from "@/app/lib/actions";
import { CreateProductForm } from "@/ui/dashboard/createProductForm";

export default async function CreateNewProductPage() {
  const categories = (await fetchCategories()) as any;

  const isCategoriesArray = Array.isArray(categories);
  const CategoryArray = isCategoriesArray ? categories : [];

  return (
    <div className="w-full h-fit min-h-screen">
      <div className="mt-28">
        <h1 className="text-4xl my-auto text-center uppercase mb-4">
          Create A New Product
        </h1>
      </div>
      <CreateProductForm categories={CategoryArray} />
    </div>
  );
}
