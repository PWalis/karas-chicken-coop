"use client";
import { Sizing } from "@/ui/shop/sizing";
import { QuantityCounter } from "@/ui/shop/quantityCounter";
import React, { useState, useEffect } from "react";
import { useCartDispatch } from "@/app/context/cartContext";
import { useRouter } from "next/navigation";
import { AddToCartAlert } from "@/ui/shop/addToCartAlert";
import { useCart } from "@/app/context/cartContext";
import clsx from "clsx";

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
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useCartDispatch(); // how to use: dispatch({ type: "ADD", payload: product });
  const [showAlert, setShowAlert] = useState(false);
  const cart = useCart();
  const router = useRouter()

  const buyNowHandler = () => {
    dispatch({ type: "ADD", payload: { ...product, size, quantity } });
    // redirect to checkout page
    router.push('/checkout')
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

  const getQtyFromCart = (productId: number, size: string) => {
    if (!cart.items) return 0;
    const item = cart.items.find(
      (item) => item.id === productId && item.size === size
    );
    return item ? item.quantity : 0;
  };

  const sizeToString: any = {
    XS: "xs_quantity",
    S: "s_quantity",
    M: "m_quantity",
    L: "l_quantity",
    XL: "xl_quantity",
    XXL: "xxl_quantity",
  };

  const addToCartHandler = () => {
    setLoading(true);
    // check if there is inventory
    if (product.inventory.hasSizes) {
      const hasInventory =
        getQtyFromCart(product.id, size) + quantity <=
        product.inventory[sizeToString[size]];
      if (!hasInventory) {
        setMessage(
          `We're sorry but we only have ${
            product.inventory[sizeToString[size]]
          } items left in size ${size}. Pleas check your cart and verify the quantity of this item.`
        );
        setLoading(false);
        setTimeout(() => {
          setMessage("");
        }, 5000);
        return;
      }
    } else {
      const hasInventory =
        getQtyFromCart(product.id, size) + quantity <=
        product.inventory.quantity;
      if (!hasInventory) {
        setMessage(
          `We're sorry but we only have ${product.inventory.quantity} items left in stock. Pleas check your cart and verify the quantity of this item.`
        );
        setLoading(false);
        setTimeout(() => {
          setMessage("");
        }, 5000);
        return;
      }
    }

    dispatch({
      type: "ADD",
      payload: { ...product, size: hasSizes ? size : null, quantity: quantity },
    });

    setQuantity(1);
    // Show the alert when the item is added to the cart
    setShowAlert(true);
    setLoading(false);
  };

  const dismissAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex gap-3 lg:justify-normal justify-center">
          {hasSizes ? (
            <Sizing size={size!} setSize={setSize} inventory={product.inventory} />
          ) : (
            <div className=""></div>
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
          className={clsx("inline-flex items-center justify-center px-5 py-3 text-xl text-center bg-floc-yellow uppercase  focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-sm", hasSizes && size==="" ? "opacity-20 hover:bg-floc-yellow" : "hover:bg-light-yellow")}
          disabled={hasSizes && size===""}
        >
          Buy Now
        </button>
        <button
          disabled={loading || (hasSizes && size==="")}
          onClick={addToCartHandler}
          className={clsx("inline-flex items-center justify-center px-5 py-2 text-xl text-center bg-floc-gray text-white tracking-wide uppercase focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-sm", hasSizes && size==="" ? "opacity-20 hover:bg-floc-gray" : "hover:bg-floc-gray/90")}
        >
          <span id="button-text">
            {loading ? "Adding To Cart" : "Add To Cart"}
          </span>
        </button>
      </div>
      <div className="">
        {message && (
          <div id="add to cart message" className="max-w-96">
            {message}
          </div>
        )}
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
