"use client";

import React from "react";
import { fetchCategories } from "@/app/lib/actions";
import { CreateProductForm } from "@/ui/dashboard/createProductForm";

export default async function CreateNewProductPage() {
  const categories = (await fetchCategories()) as any;
  
  return (
    <CreateProductForm categories={categories}/>
  );
}
