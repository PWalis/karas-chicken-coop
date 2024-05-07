"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCart, useCartDispatch } from "@/app/context/cartContext";
import { NoItemsCheckout } from "./noItemsCheckout";
import { CartList } from "./cartList";

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
    <div className="bg-gray-50 h-fit min-h-[70vh] sm:min-h-screen flex flex-col justify-center items-center md:items-start  lg:flex-row  gap-5">
      {products.length > 0 ? (
        clientSecret && (
          <>
            <div className="flex flex-col w-full max-w-[600px] p-4">
              <h2 className="text-2xl font-bold tracking-wider uppercase bg-white w-full px-4 py-3 mb-4">
                Shopping Cart
              </h2>
              <div className="flex flex-col lg:mt-0 w-full max-h-[500px] overflow-y-scroll">
                <CartList />
              </div>
            </div>
            <div className="flex flex-col w-full max-w-[600px] p-5">
              <h2 className=" bg-white text-2xl  font-bold tracking-wider uppercase w-full px-4 py-3 mb-5">
                Payment Details
              </h2>
              <div className="flex flex-col  w-full justify-center mb-10 ">
                <div className="App">
                  <Elements options={options as any} stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="justify-center">
          <NoItemsCheckout></NoItemsCheckout>
        </div>
      )}
    </div>
  );
}
