import React from "react";
import { londrina } from "@/ui/fonts";
import NavBar from "@/ui/header/navbar";
import Footer from "@/ui/footer/footer";
import StripeCheckout from "@/ui/checkout/stripeCheckout";

export default function Checkout() {
  return (
    <main>
      <div className={londrina.className}>
        <NavBar></NavBar>
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-24 bg-red-400 p-10">
          <div className="flex flex-col justify-between h-[750px] w-full bg-purple-400">
            <div className="bg-purple-500">
              <h2 className="text-2xl">Shopping Cart</h2>
              <StripeCheckout />
            </div>
            <div className="bg-purple-600">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
                eligendi.
              </p>
            </div>
          </div>
          <div className=" bg-blue-gray-500">
            <h2 className="text-2xl">Payment Details</h2>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </main>
  );
}
