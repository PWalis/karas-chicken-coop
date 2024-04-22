import React from "react";
import { londrina } from "@/ui/fonts";
import NavBar from "@/ui/header/navbar";
import Footer from "@/ui/footer/footer";

export default function Checkout() {
  return (
    <main>
      <div className={londrina.className}>
        <NavBar></NavBar>
        <div>
          <h1 className="text-6xl text-center mt-24 mb-10">Checkout</h1>
        </div>
        <Footer></Footer>
      </div>
    </main>
  );
}
