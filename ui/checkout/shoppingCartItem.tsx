import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatCurrency } from "@/app/lib/utils";
import { useCartDispatch } from "@/app/context/cartContext";
import { EditQuantity } from "./editQuantity";

interface CartItemProps {
  itemId: string;
  name: string;
  priceInCents: number;
  quantity: number;
  size: string | null;
  primaryImage: string;
  id: number;
  updatePaymentIntent: () => void;
}

export const ShoppingCartItem: React.FC<CartItemProps> = ({
  primaryImage,
  priceInCents,
  name,
  quantity,
  itemId,
  id,
  size,
  updatePaymentIntent,
}) => {
  // const [quantityState, setQuantity] = useState(quantity);
  const dispatch = useCartDispatch();
  const enumSize = (productSize: string) => {
    switch (productSize) {
      case "XS":
        return "Extra Small";
      case "S":
        return "Small";
      case "M":
        return "Medium";
      case "L":
        return "Large";
      case "XL":
        return "Extra Large";
      case "XXL":
        return "2XL";
    }
  };

  // const handleRemove = (itemId: string) => {
  //   dispatch({ type: "REMOVE", payload: itemId });
  // };

  // useEffect(() => {
  //   setQuantity(quantity);
  // }, [quantity]);

  return (
    <li key={itemId} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={primaryImage}
          alt={`primaryImage-${itemId}`}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{name}</h3>
            <p className="ml-4">{formatCurrency(priceInCents)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{enumSize(size!)}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <EditQuantity itemId={itemId} updatePaymentIntent={updatePaymentIntent}/>
          <div className="flex">
            <button
              onClick={() => dispatch({ type: "REMOVE", payload: itemId })}
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
