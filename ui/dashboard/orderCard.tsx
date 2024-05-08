import React from "react";
import { CheckMark } from "@/ui/dashboard/checkmark";
import { fetchProductsIdArray, setOrderStatus } from "@/app/lib/actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
interface OrderCardProps {
  name: string;
  date: string;
  address: string;
  zip: string;
  city: string;
  state: string;
  items: any[];
  orderId: string;
  isFulfilled: boolean;
}

export const OrderCard: React.FC<OrderCardProps> = async ({
  name,
  date,
  address,
  zip,
  city,
  state,
  items,
  orderId,
  isFulfilled,
}) => {
  if (!items) return null;
  const itemsArray = await fetchProductsIdArray(
    items.map((item) => item.productId)
  );

  const fulfillOrderHandler = async () => {
    "use server";
    await setOrderStatus(orderId, "FULFILLED");
    redirect("/orders");
  };

  return (
    <div className="drop-shadow-sm hover:drop-shadow-md bg-white h-fill lg:min-w-[500px] border rounded-md px-10 py-4 mb-4 w-fit m-2">
      <div className="flex flex-wrap justify-between gap-3">
        <h2 className="text-lg uppercase">{name}'s Order!</h2>
        <p>purchased: {date}</p>
      </div>
      <p>
        {address}, {city} {state}
      </p>
      <div className="flex flex-wrap justify-between">
        {items.map((item, index) => (
          <div className="flex flex-col" key={index}>
            <p>
              {itemsArray?.map((aItem) => {
                if (aItem.id === item.productId) {
                  return aItem.name;
                }
              })}
            </p>
            <p>Size {item.size}</p>
            <p>Qty {item.quantity}</p>
          </div>
        ))}
        {!isFulfilled && (
          <CheckMark fulfillOrder={fulfillOrderHandler}></CheckMark>
        )}
      </div>
    </div>
  );
};
