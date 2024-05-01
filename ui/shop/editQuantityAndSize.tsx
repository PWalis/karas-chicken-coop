"use client";
import { Sizing } from "@/ui/shop/sizing";
import { QuantityCounter } from "@/ui/shop/quantityCounter";
import React, { useState, useEffect } from "react";
import { useCartDispatch } from "@/app/context/cartContext";
import { redirect } from "next/navigation";
import { set } from "zod";
import { motion } from "framer-motion";

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
    <div className="border rounded-lg overflow-hidden p-2">
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
          className="px-4 py-2 w-fill bg-floc-yellow uppercase"
        >
          Buy Now
        </button>
        <button
          onClick={addToCartHandler}
          className="border-[.20em] border-floc-gray px-4 py-2 uppercase"
        >
          Add to Cart
        </button>
      </div>
      {showAlert && (
        <motion.div
          role="alert"
          className="fixed bottom-10 lg:right-10 z-50 bg-yellow-200 p-6 rounded-lg flex items-center space-x-2"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: showAlert ? 1 : 0, x: showAlert ? 0 : "100%" }}
          transition={{ duration: 0.3 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your item has been added to the Cart!</span>
          <button onClick={dismissAlert} className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2 4.236a1 1 0 011.414-1.414L10 8.586l6.293-6.293a1 1 0 111.414 1.414L11.414 10l6.293 6.293a1 1 0 01-1.414 1.414L10 11.414l-6.293 6.293a1 1 0 01-1.414-1.414L8.586 10 2.293 3.707A1 1 0 012 4.236z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </motion.div>
      )}
      </div>
    </>
  );
};
