"use client";
import React from "react";
import Link from "next/link";
import { LogOut } from "./buttons";
import CreateIcon from "../assets/icons/CreateIcon";
import ShirtIcon from "../assets/icons/ShirtIcon";
import EditIcon from "../assets/icons/EditIcon";

export const SideNav: React.FC = () => {
  return (
    <div className="relative h-screen p-4">
        <div className="bg-floc-gray/10 dashboard-bg bg-cover rounded-2xl flex sm:flex-col h-[100%] w-[300px] mr-10 relative">
          <h1 className="m-6 ml-6 mt-20 text-4xl uppercase max-w-[300px]">
            <Link
              className="text-lg sm:text-4xl mb-3 uppercase"
              href="/dashboard/orders"
            >
              Kara's Chicken Coop Dashboard
            </Link>
          </h1>
          <div className="flex flex-col">
            <div className="sm:flex hidden sm:flex-col px-2  mt-2 text-md uppercase">
              <div className="flex flex-col items-start gap-2">
                <Link className="w-full" href="/dashboard/orders">
                  <div className="flex place-items-center gap-2 w-full hover:bg-gray-400/10  px-4 py-2 text-floc-gray/90">
                    <EditIcon className="h-6 w-6" />
                    <p>View Orders</p>
                  </div>
                </Link>
                <Link className="w-full" href="/dashboard/products">
                  <div className="flex place-items-center gap-2 w-full hover:bg-gray-400/10 px-4 py-2 text-floc-gray/90">
                  <ShirtIcon className="h-6 w-6" />
                    <p>Manage Products</p>
                  </div>
                </Link>
                <Link className="w-full" href="/dashboard/createNewProduct">
                <div className="flex place-items-center gap-2 w-full hover:bg-gray-400/10 px-4 py-2 text-floc-gray/90">
                  <CreateIcon className="h-6 w-6" />
                      <p>Create Product</p>
                      </div>
                  </Link>
                
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 mb-6 ml-10">
            <LogOut />
          </div>
        </div>
    </div>
  );
};
