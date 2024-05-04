"use client";
import { Sizing } from "@/ui/shop/sizing";
import { QuantityCounter } from "@/ui/shop/quantityCounter";
import React, { useState, useEffect } from "react";
import { useCartDispatch } from "@/app/context/cartContext";
import { redirect } from "next/navigation";
import { set } from "zod";
import { motion } from "framer-motion";
import { AddToCartAlert } from "./addToCartAlert";

interface EditQuantityAndSizeProps {
  product: any;
}

export const EditQuantityAndSize: React.FC<EditQuantityAndSizeProps> = ({
  product,
}) => {
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useCartDispatch(); // how to use: dispatch({ type: "ADD", payload: product });
  const [showAlert, setShowAlert] = useState(false);

  const buyNowHandler = () => {
    dispatch({ type: "ADD", payload: { ...product, size, quantity } });
    // redirect to checkout page
    redirect("/checkout");
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (showAlert) {
      // Automatically dismiss the alert after 5 seconds
      timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showAlert]);

  const addToCartHandler = () => {
    dispatch({ type: "ADD", payload: { ...product, size: size, quantity: quantity } });
    setQuantity(1);
    // Show the alert when the item is added to the cart
    setShowAlert(true);
    console.log(product, size, quantity);
  };

  const dismissAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
    <div className="border rounded-sm shadow-sm w-full bg-gray-100/10 p-4">
      <div className="flex flex-col ">
        <div className="flex lg:justify-normal justify-center">
          <Sizing size={size!} setSize={setSize}></Sizing>
        </div>
        <div className="flex justify-center lg:justify-normal">
          <QuantityCounter
            quantity={quantity}
            setQuantity={setQuantity}
          ></QuantityCounter>
        </div>
      </div>
      <div className="flex gap-3 justify-center lg:justify-start">
        <button
          onClick={buyNowHandler}
          className="px-4 py-2 w-fill bg-floc-yellow uppercase font-bold tracking-wide"
        >
          Buy Now
        </button>
        <button
          onClick={addToCartHandler}
          className="bg-floc-gray text-gray-100 tracking-wider px-4 py-2 uppercase"
        >
          Add to Cart
        </button>
      </div>
      {showAlert && (
        <AddToCartAlert showAlert={showAlert} dismissAlert={dismissAlert}></AddToCartAlert>
      )}
      </div>
    </>
  );
};
