"use client";

import React from "react";
import { AddToCardButton } from "./buttons";
import { useContext } from "react";
import { useCartDispatch, useCart } from "@/app/context/cartContext";

interface ItemCardProps {
  name: string;
  price: string;
  description: string;
  images: string[];
  category: string;
  inventory: number;
  productId: number;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  name,
  price,
  description,
  images,
  category,
  inventory,
  productId,
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
        },
      });
      console.log(cart);
    }
  };

  return (
    <div className="item-card group">
      <img className=" w-[300px]" src={images[0]} alt="item" />
      <div className="flex justify-between place-items-end px-2 py-2 bg-floc-gray/10">
        <div>
          <h3 className="text-2xl uppercase">{name}</h3>
          <p className="text-md">{price}</p>
        </div>
        <div>
          <AddToCardButton onClick={clickHandler}></AddToCardButton>
        </div>
      </div>
      {/* <p>{cart}</p> */}
    </div>
  );
};
