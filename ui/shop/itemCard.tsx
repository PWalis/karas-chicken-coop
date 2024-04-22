import React from "react";
import { AddToCardButton } from "./buttons";

export const ItemCard = () => {
  return (
    <div className="item-card group">
      <img src="https://via.placeholder.com/300" alt="item" />
      <div className="flex justify-between place-items-end px-2 py-2 bg-floc-gray/10">
        <div>
          <h3 className="text-2xl uppercase">Item Name</h3>
          <p className="hidden"> xs s m lg xl </p>
          <p className="text-md">$0.00</p>
        </div>
        <div>
          <AddToCardButton></AddToCardButton>
        </div>
      </div>
    </div>
  );
};
