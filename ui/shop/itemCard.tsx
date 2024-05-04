"use client";

import React from "react";
import { AddToCardButton } from "./buttons";
import { useContext, useState, useEffect } from "react";
import { useCart, useCartDispatch } from "@/app/context/cartContext";
import Link from "next/link";
import Sizing from "./sizing";
import { AddToCartAlert } from "./addToCartAlert";
import { set } from "zod";

interface ItemCardProps {
  name: string;
  price: string;
  description: string;
  images: string[];
  category: string;
  inventory: number;
  productId: number;
  stripePriceKey: string;
  product: any;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  name,
  price,
  description,
  images,
  category,
  inventory,
  productId,
  stripePriceKey,
}) => {
  const dispatch = useCartDispatch();
  const cart = useCart();

  const clickHandler = () => {
    if (dispatch) {
      dispatch({
        type: "ADD",
        payload: {
          name,
          price,
          description,
          images,
          category,
          inventory,
          productId,
          stripePriceKey,
        },
      });
      console.log(cart);
    }
  };

  const [showSizes, setShowSizes] = useState(false);
  const [buttonHTML, setButtonHTML] = useState('Add to Cart');
  const [addSizeButtonText, setAddSizeButtonText] = useState('Add Size');
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToCart = () => {
    setShowSizes(!showSizes);
    setButtonHTML(showSizes ? 'Add to Cart' : '<span class="loading loading-dots loading-md"></span>'); // Change button HTML
    console.log(showSizes);
  };

  const handleAddSize = () => {
    setTimeout(() => {
      setAddSizeButtonText('Add Size');
    }, 5000);
    setShowAlert(true);
    clickHandler();
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

  return (
    <div className="item-card relative">
      <Link href={`/shop/${productId}`} className="relative group">
        <img className="w-[300px] group-hover:opacity-40 ease-in-out transition-all cursor-pointer group" src={images[0]} alt="item" />
        <button className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-floc-gray px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-200 uppercase font-bold bg-gray-100`}> View item </button>
        </Link>
        <div className="flex justify-between place-items-end px-2 py-2 bg-gray-100">
          <div>
            <h3 className="text-2xl uppercase">{name}</h3>
            <p className="text-md">{price}</p>
          </div>
          <div className="relative">
            <button onClick={handleAddToCart} className={`inline-flex items-center justify-center h-12 w-28 text-md text-center bg-floc-gray hover:bg-floc-gray/90 text-gray-100 tracking-wide uppercase  focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-md transition-all ease-in-out`} dangerouslySetInnerHTML={{ __html: buttonHTML }}>
            </button>
          </div>
        </div>
      {showSizes && (
        <div className="absolute z-50 left-1/2 w-full transform -translate-x-1/2 bg-white border border-gray-300 p-2 shadow mt-2">
          {/* Dropdown content */}
          <div className="flex flex-col justify-center items-center">
            <p className="text-floc-gray">Please select your size: </p>
            <Sizing size={size!} setSize={setSize} />
            <button onClick={handleAddSize} className="inline-flex items-center justify-center px-4 py-2 text-md text-center w-full bg-floc-yellow uppercase focus:bg-light-yellow hover:bg-light-yellow focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-md"> {addSizeButtonText} </button>
          </div>
        </div>
      )}
            {showAlert && (
        <AddToCartAlert showAlert={showAlert} dismissAlert={dismissAlert}></AddToCartAlert>
      )}
    </div>
  );
};
