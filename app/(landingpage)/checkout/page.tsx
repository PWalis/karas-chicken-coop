import React from "react";
import { londrina } from "@/ui/fonts";
import NavBar from "@/ui/header/navbar";
import Footer from "@/ui/footer/footer";
import StripeCheckout from "@/ui/checkout/stripeCheckout";
import { CartList } from "@/ui/checkout/cartList";

export default function Checkout() {
  // show list of items in cart
  // show total price
  // allow to modify quantity of items

  return (
    <main>
      <div className={londrina.className}>
        <NavBar></NavBar>
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-24 gap-5 p-10">
          <div className="flex flex-col justify-between h-[750px] w-full ">
            <div className="">
              <h2 className="text-2xl">Shopping Cart</h2>
              <CartList />
            </div>
            {/* <div className=""> */}
            {/* </div> */}
          </div>
          <div className=" ">
            <h2 className="text-2xl">Payment Details</h2>
            <StripeCheckout />
          </div>
        </div>
        <Footer></Footer>
      </div>
    </main>
  );
}
