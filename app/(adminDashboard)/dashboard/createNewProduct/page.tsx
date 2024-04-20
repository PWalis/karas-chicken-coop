import React from "react";
import { fetchCategories } from "@/app/lib/actions";
import { CreateProductForm } from "@/ui/dashboard/createProductForm";

export default async function CreateNewProductPage() {
  const categories = (await fetchCategories()) as any;

  const isCategoriesArray = Array.isArray(categories)
  const CategoryArray = isCategoriesArray ? categories : []
  
  return (
    <CreateProductForm categories={CategoryArray}/>
  );
}
