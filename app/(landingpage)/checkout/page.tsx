import React from "react";
import { londrina } from "@/ui/fonts";
import NavBar from "@/ui/header/navbar";
import Footer from "@/ui/footer/footer";
import StripeCheckout from "@/ui/checkout/stripeCheckout";
import { CartList } from "@/ui/checkout/cartList";
import Stripe from "stripe";
import ShopNavBar from "@/ui/shop/shopNavBar";

export default function Checkout() {
  // show list of items in cart
  // show total price
  // allow to modify quantity of items

  return (
    <main className="min-h-screen">
      <div className={londrina.className}>
        <ShopNavBar></ShopNavBar>
        <h2 className="text-4xl sm:text-6xl text-center pt-24 pb-4 flex justify-center uppercase">
          Checkout
        </h2>
        <StripeCheckout></StripeCheckout>
      </div>
      <Footer></Footer>
    </main>
  );
}
