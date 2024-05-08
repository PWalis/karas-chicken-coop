import React from "react";
import {
  AddressElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "@/app/context/cartContext";
import { useDebouncedCallback } from "use-debounce";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const cart = useCart();

  const [message, setMessage] = React.useState(null || "");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => { 
      switch (paymentIntent!.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const hasInventory = await fetch("/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data: cart}),
    });

    const response = await hasInventory.json();

    if (response.message.message != "There is enough inventory") {
      console.log("hasInventory", response.message.message);
      setIsLoading(false);
      setMessage("Item is out of stock"); //this needs to be investigated further
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message!);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: { type: "tabs" },
  };

  const handleAddressChange = useDebouncedCallback((event: any) => {
    // create a new order with the address
    // update payment intent metadata with the orderId
    if (event.complete) {
      setIsLoading(true);
      setMessage("");
      console.log("event", event.value.address.country);
      if (event.value.address.country !== "US") {
        setMessage("We only ship to the US");
        return;
      }
      fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: event.value,
          cart: cart,
          paymentIntentId: cart.paymentIntentId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
        });
    }
  }, 1300);

  return (
    <div className="max-w-[600px] bg-white shadow-sm p-4">
    <form className="flex flex-col justify-center" id="payment-form" onSubmit={handleSubmit as any}>
      <PaymentElement
        id="payment-element"
        options={paymentElementOptions as any}
      />
      <AddressElement
        id="address-element"
        options={{ mode: "shipping" }}
        onChange={(event) => {
          handleAddressChange(event);
        }}
      />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span className="mx-auto h-12 flex justify-center items-center bg-floc-yellow mt-3 hover:bg-light-yellow" id="button-text">
          {isLoading ? <span className="loading loading-spinner loading-md" id="spinner"></span> : <p className="uppercase tracking-wide">Submit Payment</p>}
        </span>
      </button>
      <p className="text-sm text-gray-500 pt-1 mx-auto justify-center"> Secure payment with <a className="text-blue-400" href="stripe.com"> Stripe </a>  checkout. </p>
      {message && <div className="text-red-600/80 mx-auto" id="payment-message">{message}</div>}
    </form>
  </div>
  );
}
