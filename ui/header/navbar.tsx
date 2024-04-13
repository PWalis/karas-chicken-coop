"use client";

import Image from "next/image";
import { ShopButton, HamburgerMenu, Logo, JoinTheFlockButton } from "./buttons";
import clsx from "clsx";
import { useState } from "react";
import Kcc3 from "../assets/svgs/Kcc3";
export default function NavBar() {
  const [navMenu, setNavMenu] = useState(false);

  const handleHamburgerClick = () => {
    setNavMenu(!navMenu);
    console.log("nav clicked");
  };

  return (
    <nav className="bg-white/90 border-gray-200 dark:bg-gray-900 font-bold text-sm uppercase fixed w-full top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap gap-1 items-center justify-between mx-auto">
        <div className="flex justify-end items-center">
          <Kcc3 className="h-20 lg:h-28 p-2 flex justify-end items-center w-auto" />
          <h2 className="text-lg md:text-xl">Kara's Chicken Coop</h2>
        </div>
        <div className="flex md:order-2 space-x-3 gap-3 md:space-x-0 rtl:space-x-reverse">
          <div className="hidden sm:block">
            <ShopButton>Shop</ShopButton>
          </div>
          <div className="hidden md:block">
            <JoinTheFlockButton></JoinTheFlockButton>
          </div>
          <div className="pr-2">
            <HamburgerMenu
              handleHamburgerClick={handleHamburgerClick}
            ></HamburgerMenu>
          </div>
        </div>
        <div
          className={clsx(
            "items-center justify-between md:flex md:w-auto md:order-1 text-floc-gray",
            navMenu ? "flex relative pr-2.5 w-full" : "hidden"
          )}
          id="navbar-cta"
        >
          <ul
            className={clsx(
              "flex p-4 md:p-0 mt-4 border w-full border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white",
              navMenu ? "flex-col min-w-full" : ""
            )}
          >
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40 jose"
              >
                Meet The Chickens
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40 "
              >
                Who We Are
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40"
              >
                Socials
              </a>
            </li>
            <li className={clsx(navMenu ? "block sm:hidden" : "hidden")}>
              <a
                href="#"
                className={clsx(
                  " py-2 px-3 md:p-0  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40",
                  navMenu ? "block md:hidden" : "hidden"
                )}
              >
                Join the flock
              </a>
            </li>
            <li className={clsx(navMenu ? "block sm:hidden" : "hidden")}>
              <ShopButton>Shop</ShopButton>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
