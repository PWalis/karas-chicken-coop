"use client";

import React from "react";
import { AddToCardButton } from "./buttons";
import { useContext, useState, useEffect, useRef } from "react";
import { useCart, useCartDispatch } from "@/app/context/cartContext";
import Link from "next/link";
import Sizing from "./sizing";
import { AddToCartAlert } from "./addToCartAlert";
import { set } from "zod";
import { fetchProductById } from "@/app/lib/actions";

interface ItemCardProps {

  product: any;

}

export const ItemCard: React.FC<ItemCardProps> = ({ product }) => {
  const dispatch = useCartDispatch();
  const cart = useCart();

  // const clickHandler = () => {
  //   if (dispatch) {
  //     dispatch({
  //       type: "ADD",
  //       payload: {
  //         name,
  //         price,
  //         description,
  //         images,
  //         category,
  //         inventory,
  //         productId,
  //         stripePriceKey,
  //       },
  //     });
  //     console.log(cart);
  //   }
  // };

  const [showSizes, setShowSizes] = useState(false);
  const [buttonHTML, setButtonHTML] = useState("Add to Cart");
  const [addSizeButtonText, setAddSizeButtonText] = useState("Add Size to Cart");
  const [showAlert, setShowAlert] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    setShowSizes(!showSizes);
    setButtonHTML(
      showSizes
        ? "<p>Add to Cart</p>"
        : '<span class="loading loading-dots loading-md"></span>'
    ); // Change button HTML
    console.log(showSizes);
  };

  const handleAddSize = () => {
    dispatch({
      type: "ADD",
      payload: { ...product, size: size, quantity: quantity },
    });
    setQuantity(1);
    setTimeout(() => {
      setAddSizeButtonText("Add Size");
    }, 5000);
    setShowAlert(true);
    // clickHandler();
    setShowSizes(false); // Dismiss the showSizes component
    setButtonHTML("Add to Cart");
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

  const dismissAlert = () => {
    setShowAlert(false);
  };

  const [size, setSize] = useState("M");
  const sizesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sizesRef.current && !sizesRef.current.contains(event.target as Node)) {
        setShowSizes(false);
        setButtonHTML("Add to Cart");
      }
    };

    if (showSizes) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSizes]);

  return (
    <div className="item-card relative mx-4">
      <Link href={`/shop/${product.id}`} className="relative group">
        <img
          className="w-fit group-hover:opacity-40 group-hover:blur-[1px] ease-in-out transition-all cursor-pointer group"
          src={product.images[0]}
          alt="item"
        />
        <button
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-floc-gray px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-200 uppercase font-bold bg-gray-100/90`}
        >
          View item
        </button>
      </Link>
      <div className="flex flex-col gap-2 justify-between place-items-center px-3 py-2 bg-gray-50 border shadow-sm">
        <div>
          <h3 className="text-2xl uppercase">{product.name}</h3>
          <p className="text-md">{product.price}</p>
        </div>
        <div className="flex gap-3">
          <Link href={`/shop/${product.id}`}>
          <button className="inline-flex items-center justify-center h-12 w-20 text-md text-center border-[.20em] bg-floc-gray text-white tracking-wide uppercase  focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-sm transition-all ease-in-out"> View </button>
          </Link>
          <button
            onClick={handleAddToCart}
            className={`inline-flex items-center justify-center h-12 w-28 text-md text-center border-[.20em]  text-floc-gray tracking-wide uppercase  focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-sm transition-all ease-in-out`}
            dangerouslySetInnerHTML={{ __html: buttonHTML }}
          ></button>
        </div>
      </div>
      {showSizes && (
        <div ref={sizesRef} className="absolute z-50 left-1/2 w-full transform -translate-x-1/2 bg-white border border-gray-300 p-2 shadow mt-2">
          {/* Dropdown content */}
          <div className="flex flex-col justify-center items-center">
            <p className="text-floc-gray">Please select your size: </p>
            <div className="flex justify-center items-center">
            <Sizing size={size!} setSize={setSize} inventory={product.inventory} />
            </div>
            <button
              onClick={handleAddSize}
              className="inline-flex items-center justify-center px-4 py-2 text-md text-center w-full bg-floc-yellow uppercase focus:bg-light-yellow hover:bg-light-yellow focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-md"
            >
    
              {addSizeButtonText}
            </button>
          </div>
        </div>
      )}
      {showAlert && (
        <AddToCartAlert
          showAlert={showAlert}
          dismissAlert={dismissAlert}
        ></AddToCartAlert>
      )}
    </div>
  );
};
