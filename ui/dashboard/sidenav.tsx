"use client";
import React from "react";
import Link from "next/link";
import { LogOut } from "./buttons";
import { useEffect, useState } from "react";
import MobileNav from "./mobilenav";

export const SideNav: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Adjust the breakpoint according to your needs
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
        <div className="loading-bg bg-cover flex sm:flex-col h-screen w-[400px] bg-floc-yellow mr-10">
          <h1 className="m-6 ml-10 mt-20 text-4xl uppercase max-w-[300px]">
            <Link className="text-lg sm:text-4xl mb-3 uppercase" href="/dashboard">
              Kara's Chicken Coop Dashboard
            </Link>
          </h1>
          <div className="flex flex-col">
            <div className="sm:flex hidden sm:flex-col m-10 mt-2 text-xl">
              <div className="flex flex-col items-start gap-2">
                <Link href="/dashboard/orders">View Orders</Link>
                <Link href="/dashboard/products">View Products</Link>
                <Link href="/dashboard/createNewProduct">New Product</Link>
                <div className="justify-end mt-96">
                  <LogOut />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};