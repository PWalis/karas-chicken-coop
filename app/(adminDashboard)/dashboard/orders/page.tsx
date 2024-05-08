import React from "react";
import { OrderCard } from "@/ui/dashboard/orderCard";

export default function OrdersPage() {
  return (
    <div className="flex-col w-full h-fit min-h-screen">
      <h2 className="flex text-4xl  mb-10 mt-28 text-center uppercase justify-center">
        Your Orders
      </h2>
      <div className="flex flex-wrap justify-center gap-14">
        <div>
          <h3 className="uppercase text-center text-xl"> Your Current Orders </h3>
          <div className="w-fit h-[500px] overflow-y-scroll no-scrollbar">
            {" "}
            <OrderCard></OrderCard>
            <OrderCard></OrderCard>
            <OrderCard></OrderCard>
            <OrderCard></OrderCard>
          </div>
        </div>
        <div>
          <h3 className="uppercase text-center text-xl"> Your Fulfilled Orders </h3>
          <div className="w-fit h-[500px] overflow-y-scroll no-scrollbar mb-4">
            {" "}
            <OrderCard></OrderCard>
            <OrderCard></OrderCard>
            <OrderCard></OrderCard>
            <OrderCard></OrderCard>
            <OrderCard></OrderCard>
            <OrderCard></OrderCard>
          </div>
        </div>
      </div>
    </div>
  );
}
