"use client";
import React from "react";
import Link from "next/link";
import { LogOut } from "./buttons";
import { useEffect, useState } from "react";
import MobileNav from "./mobilenav";
import CreateIcon from "../assets/icons/CreateIcon";
import ShirtIcon from "../assets/icons/ShirtIcon";
import EditIcon from "../assets/icons/EditIcon";

export const SideNav: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1500); // Adjust the breakpoint according to your needs
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative">
      {isMobile ? (
        <MobileNav />
      ) : (
        <div className="bg-floc-gray/10 rounded-2xl bg-cover flex sm:flex-col h-[95%] mt-5 ml-5 w-[300px] mr-10 relative">
          <h1 className="m-6 ml-6 mt-20 text-4xl uppercase max-w-[300px]">
            <Link
              className="text-lg sm:text-4xl mb-3 uppercase"
              href="/dashboard"
            >
              Kara's Chicken Coop Dashboard
            </Link>
          </h1>
          <div className="flex flex-col">
            <div className="sm:flex hidden sm:flex-col px-2  mt-2 text-md uppercase">
              <div className="flex flex-col items-start gap-2">
                <Link className="w-full" href="/dashboard/orders">
                  <div className="flex place-items-center gap-2 w-full hover:bg-floc-gray/10 px-4 py-2 text-floc-gray/90">
                    <EditIcon className="h-6 w-6" />
                    <p>View Orders</p>
                  </div>
                </Link>
                <Link className="w-full" href="/dashboard/products">
                  <div className="flex place-items-center gap-2 w-full hover:bg-floc-gray/10 px-4 py-2 text-floc-gray/90">
                  <ShirtIcon className="h-6 w-6" />
                    <p>Manage Products</p>
                  </div>
                </Link>
                <Link className="w-full" href="/dashboard/createNewProduct">
                <div className="flex place-items-center gap-2 w-full hover:bg-floc-gray/10 px-4 py-2 text-floc-gray/90">
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
      )}
    </div>
  );
};
