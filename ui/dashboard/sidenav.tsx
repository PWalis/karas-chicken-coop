import React from "react";
import Link from "next/link"
import { LogOut } from "./buttons";

export const SideNav: React.FC = () => {
  return (
    <div className="flex gap-3 flex-col pt-24 pl-5 h-screen w-[8%] bg-red-500 mr-14">
      <Link href="/dashboard" className="">Dashboard</Link>
      <Link href="/dashboard/orders" >Orders</Link>
      <Link href="/dashboard/products">Products</Link>
      <Link href="/dashboard/createNewProduct">New Product</Link>
      <LogOut />
    </div>
  );
};
