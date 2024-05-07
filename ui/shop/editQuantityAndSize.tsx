"use client";
import { Sizing } from "@/ui/shop/sizing";
import { QuantityCounter } from "@/ui/shop/quantityCounter";
import React, { useState, useEffect } from "react";
import { useCartDispatch } from "@/app/context/cartContext";
import { redirect } from "next/navigation";
import { AddToCartAlert } from "@/ui/shop/addToCartAlert";

interface EditQuantityAndSizeProps {
  product: any;
  hasSizes: boolean;
  quantityLimit: {
    XS?: number;
    S?: number;
    M?: number;
    L?: number;
    XL?: number;
    XXL?: number;
    limit?: number;
  };
}

export const EditQuantityAndSize: React.FC<EditQuantityAndSizeProps> = ({
  product,
  hasSizes,
  quantityLimit,
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
    dispatch({
      type: "ADD",
      payload: { ...product, size: size, quantity: quantity },
    });
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
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex gap-3 lg:justify-normal justify-center">
          {hasSizes ? (
            <Sizing size={size!} setSize={setSize} />
          ) : (
            <div className="h-20"></div>
          )}
        </div>
        <div className="flex justify-center lg:justify-normal">
          <QuantityCounter
            size={size}
            hasSizes={hasSizes}
            quantityLimit={quantityLimit}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
      </div>
      <div className="flex mb-10 mt-4 gap-3 justify-center">
        <button
          onClick={buyNowHandler}
          className="inline-flex items-center justify-center px-5 py-3 text-xl text-center bg-floc-yellow uppercase hover:bg-light-yellow focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-sm"
        >
          Buy Now
        </button>
        <button
          onClick={addToCartHandler}
          className="inline-flex items-center justify-center px-5 py-2 text-xl text-center bg-floc-gray text-white tracking-wide uppercase hover:bg-floc-gray/90 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-sm"
        >
          Add to Cart
        </button>
      </div>
      {showAlert && (
        <AddToCartAlert
          showAlert={showAlert}
          dismissAlert={dismissAlert}
        ></AddToCartAlert>
      )}
    </>
  );
};
