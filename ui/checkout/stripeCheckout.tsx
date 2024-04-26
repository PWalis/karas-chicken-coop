import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "@/app/context/cartContext";
import { stripeCreatePaymentIntent } from "@/app/lib/stripe";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY || " ";
const stripePromise = loadStripe(stripePublicKey);

export default async function StripeCheckout() {
  const cart = useCart() as any;
  const [clientSecret, setClientSecret] = useState(null);
  const fetchClientSecret = async () => {
     const secret = await stripeCreatePaymentIntent(cart) as any;
     setClientSecret(secret);
  };

  useEffect(() => {
    fetchClientSecret();
  }, [cart]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret != null && (
        <Elements options={options} stripe={stripePromise}>
          
        </Elements>
      )}
    </div>
  );
}
