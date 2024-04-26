import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCart } from "@/app/context/cartContext";

import { createCheckoutSession } from "@/app/lib/stripe";

export const StripeEmbeddedCheckout: React.FC = () => {
  //   const stripePublicKey = process.env.STRIPE_PUBLIC_KEY || " ";
  const stripePromise = loadStripe(
    "pk_test_51Jra2XLG2GmA2ElmqyWFRkyDKs91573iTTJi6Z3tehA6FvPFCYvuB7X1r9WffXNCNnMZjw0PftZMGT5hENZCQWhu00mYVlgC9Z"
  );
  const cart = useCart() as any;

  const line_items = cart.items.map((item: any) => {
    return {
      price: item.stripePriceKey,
      quantity: 1,
    };
  });

  const fetchClientSecret = useCallback(() => {
    return createCheckoutSession(line_items)
  }, [line_items]);

  const options = {fetchClientSecret};

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
