import React from "react";
import { OrderCard } from "@/ui/dashboard/orderCard";

export default function DashBoard() {
  return (
    <div className="flex w-full flex-col min-h-screen h-fit">
      <div className="flex mt-28 text-center justify-center">
        <h1 className="text-4xl my-auto mb-10 text-center uppercase">
          Welcome Kara!
        </h1>
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-xl uppercase mb-3">Your Orders:</h2>
        <div className="gap-14 justify-center h-fill">
          <OrderCard></OrderCard>
          <OrderCard></OrderCard>
          <OrderCard></OrderCard>
          </div>
        </div>
      </div>

  );
}
