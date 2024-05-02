"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCart, useCartDispatch } from "@/app/context/cartContext";

import CheckoutForm from "@/ui/checkout/checkoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51Jra2XLG2GmA2ElmqyWFRkyDKs91573iTTJi6Z3tehA6FvPFCYvuB7X1r9WffXNCNnMZjw0PftZMGT5hENZCQWhu00mYVlgC9Z"
);

export default function App() {
  const [clientSecret, setClientSecret] = React.useState("");
  const cart = useCart();
  const dispatch = useCartDispatch();
  const products = cart.items.map((item) => {
    return { productId: item.id, quantity: item.quantity };
  });

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (products.length === 0) return;
    fetch("/api/paymentIntent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: products }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        dispatch({
          type: "SET_PAYMENT_INTENT_ID",
          payload: data.paymentIntentId,
        });
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
    loader: "always",
  };

  return (
    <div className="App">
      {products.length > 0 ? (
        clientSecret && (
          <Elements options={options as any} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )
      ) : (
        <div>No items in cart</div>
      )}
    </div>
  );
}
