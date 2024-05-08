import { ProductsList } from "@/ui/dashboard/productsList";
import React from "react";

export default function ProductsPage() {

  return (
    <div className="h-fit min-h-screen w-screen">
      <h2 className="text-4xl my-auto mb-10 mt-28 text-center uppercase justify-center flex place-items-center"> Manage Products </h2>
      <ProductsList />
    </div>
  );
}
