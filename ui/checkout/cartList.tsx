"use client";

import React, { useCallback } from "react";
import { useCart } from "@/app/context/cartContext";
import { ShoppingCartItem } from "@/ui/checkout/shoppingCartItem";
import { useDebouncedCallback } from "use-debounce";
// get items from context
// map context list to shop items

export const CartList: React.FC = () => {
  const cart = useCart();

  const debounceHandler = useDebouncedCallback(async () => {
    const products = cart.items.map((item: any) => {return {productId: item.id, quantity: item.quantity}})
    await fetch("/api/paymentIntent", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentIntentId:  cart.paymentIntentId, products: products}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, 1300)

  return (
    <div className="flex flex-col">
      {cart.items.map((item) => (
        <ShoppingCartItem
          size={item.size}
          name={item.name}
          itemId={item.itemId}
          quantity={item.quantity}
          priceInCents={item.priceInCents}
          id={item.id}
          primaryImage={item.primaryImage}
          updatePaymentIntent={debounceHandler}
        />
      ))}
    </div>
  );
};
