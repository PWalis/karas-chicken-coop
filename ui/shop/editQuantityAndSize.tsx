'use client';
import { Sizing } from "@/ui/shop/sizing";
import { QuantityCounter } from "@/ui/shop/quantityCounter";
import React, { useState } from "react";
import { useCartDispatch } from "@/app/context/cartContext";
import { redirect } from "next/navigation";
import { set } from "zod";

interface EditQuantityAndSizeProps {
    product: any;
}

export const EditQuantityAndSize: React.FC<EditQuantityAndSizeProps> = ({ product }) => {
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useCartDispatch(); // how to use: dispatch({ type: "ADD", payload: product });

  const buyNowHandler = () => {
    dispatch({ type: "ADD", payload: { ...product, size, quantity } });
    // redirect to checkout page
    redirect("/checkout");
  };

  const addToCartHandler = () => {
    dispatch({ type: "ADD", payload: { ...product, size: size, quantity: quantity } });
    setQuantity(1);
    console.log(product, size, quantity);
  };

  return (
    <>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex gap-3 lg:justify-normal justify-center">
          <Sizing size={size!} setSize={setSize}></Sizing>
        </div>
        <div className="flex justify-center lg:justify-normal mt-2">
          <QuantityCounter quantity={quantity} setQuantity={setQuantity}></QuantityCounter>
        </div>
      </div>
      <div className="flex mb-10 mt-4 gap-3 justify-center">
        <button onClick={buyNowHandler} className="px-4 py-2 w-fill bg-floc-yellow uppercase">
          Buy Now
        </button>
        <button onClick={addToCartHandler} className="border-[.20em] border-floc-gray px-4 py-2 uppercase">
          Add to Cart
        </button>
      </div>
    </>
  );
};
