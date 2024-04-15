import React from "react";
import { Products } from "@/ui/shop/products";
import { ProductFilter } from "@/ui/shop/filter";

export default function Shop() {
  return (
    <main className="mt-20">
      <div className="flex justify-center pt-10">
        <h1 className="text-6xl text-center">Welcome to Kara's Chicken Shop</h1>
      </div>
      <div className="block justify-center sm:grid sm:grid-cols-6">
        <div className="sticky top-14 sm:fixed flex sm:top-52 sm:left-10 justify-center pt-5 sm:pt-10">
          <ProductFilter />
        </div>
        <div className="flex justify-center pt-5 sm:pt-10 sm:col-start-2 sm:col-span-4">
          <Products />
        </div>
      </div>
    </main>
  );
}
