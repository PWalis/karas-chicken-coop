import React from "react";
import { OrderCard } from "@/ui/dashboard/orderCard";
import {
  fetchAllFulfilledOrders,
  fetchAllProcessedOrders,
} from "@/app/lib/actions";

export default async function OrdersPage() {
  const fulfilledOrders = await fetchAllFulfilledOrders();
  const processedOrders = await fetchAllProcessedOrders();

  return (
    <div className="flex-col w-full h-fit min-h-screen">
      <h2 className="flex text-4xl  mb-10 mt-28 text-center uppercase justify-center">
        View Your Orders:
      </h2>
      <div className="flex flex-wrap justify-center gap-14">
        <div>
          <h3 className="uppercase text-center text-xl">Your Current Orders</h3>
          {processedOrders && processedOrders.length > 0 ? (
            <div className="w-fit h-[500px] lg:w-[530px] overflow-y-scroll">
              {processedOrders.map((order) => (
                <OrderCard
                  orderId={order.id}
                  name={order.name}
                  date={order.createdAt.toDateString()}
                  address={order.address}
                  zip={order.zip}
                  city={order.city}
                  state={order.state}
                  items={order.orderItems}
                  key={order.id}
                  isFulfilled={false}
                />
              ))}
            </div>
          ) : (
            <div className="w-fit lg:w-[530px] overflow-hidden flex  mt-10 justify-center">
              <p>You have no current orders.</p>
            </div>
          )}
        </div>
        <div>
          <h3 className="uppercase text-center text-xl">
            Your Fulfilled Orders
          </h3>
          <div className="w-fit h-[500px] overflow-y-scroll no-scrollbar mb-4">
          {fulfilledOrders && fulfilledOrders.length > 0 ? (
            <div className="w-fit h-[500px] lg:w-[530px] overflow-y-scroll mb-4">
              {fulfilledOrders!.map((order) => (
                <OrderCard
                  orderId={order.id}
                  name={order.name}
                  date={order.createdAt.toDateString()}
                  address={order.address}
                  zip={order.zip}
                  city={order.city}
                  state={order.state}
                  items={order.orderItems}
                  key={order.id}
                  isFulfilled={true}
                />
              ))}
            </div>
          ) : (
            <div className="w-fit lg:w-[530px] overflow-hidden flex mt-10 justify-center">
              <p>You have no fulfilled orders.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
