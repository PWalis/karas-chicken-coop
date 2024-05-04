"use client";
import { useCartDispatch, useCart } from "@/app/context/cartContext";
import React from "react";

interface QuantityCounterProps {
  // quantity: number;
  // setQuantity: (quantity: number) => void;
  itemId: string;
  updatePaymentIntent: () => void;
}

export const EditQuantity: React.FC<QuantityCounterProps> = ({
  // quantity,
  // setQuantity,
  itemId,
  updatePaymentIntent,
}) => {
  const dispatch = useCartDispatch();
  const cart = useCart();

  const addHandler = () => {
    const newQuantity = cart.items.find((item) => item.itemId === itemId)!.quantity + 1;
    dispatch({
      type: "SET_QUANTITY",
      payload: { itemId: itemId, quantity: newQuantity },
    });
    updatePaymentIntent();
  };

  const subtractHandler = () => {
    if (cart.items.find((item) => item.itemId === itemId)!.quantity > 1) {
      const newQuantity = cart.items.find((item) => item.itemId === itemId)!.quantity - 1;
      dispatch({
        type: "SET_QUANTITY",
        payload: { itemId, quantity: newQuantity },
      });
      updatePaymentIntent();
    }
  };

  const editHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      dispatch({ type: "SET_QUANTITY", payload: { itemId: itemId, quantity: value } });
      updatePaymentIntent();
    }
  };

  const products = cart.items.map((item) => {
    return { productId: item.id, quantity: item.quantity };
  });

  return (
    <div className="flex gap-2 mb-2">
      <form className="flex gap-2 flex-col max-w-xs ">
        <label
          htmlFor="quantity-input"
          className="block text-md font-medium text-gray-900 dark:text-white"
        >
          Quantity:
        </label>
        <div className="relative flex items-center max-w-[8rem]">
          <button
            type="button"
            id="decrement-button"
            onClick={subtractHandler}
            data-input-counter-decrement="quantity-input"
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            id="quantity-input"
            value={cart.items.find((item) => item.itemId === itemId)!.quantity}
            onChange={editHandler}
            data-input-counter
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="1"
            typeof="number"
            required
          />
          <button
            type="button"
            onClick={addHandler}
            id="increment-button"
            data-input-counter-increment="quantity-input"
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
