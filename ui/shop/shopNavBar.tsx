"use client";

import Link from "next/link";
import { HamburgerMenu } from "../header/buttons";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Kcc3 from "../assets/svgs/Kcc3";
import { CartButton } from "./buttons";
import SlideCart from "./slideCart";
import { useCart } from "@/app/context/cartContext";


export default function ShopNavBar() {
  const [navMenu, setNavMenu] = useState(false);

  const [open, setOpen] = useState(false);

  const [hasItems, setHasItems] = useState(false);

  const cart = useCart()

  useEffect(() => {
    // Update hasItems whenever products array changes
    setHasItems(cart.items.length > 0);
    console.log("items:", hasItems)
  }, [cart]);

  const handleCartButtonClick = () => {
    setOpen(!open); // Toggle the state of open
  };

  const handleHamburgerClick = () => {
    setNavMenu(!navMenu);
    console.log("nav clicked");
  };

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-md border-gray-200 dark:bg-gray-900 font-bold text-sm uppercase fixed w-full top-0 z-50">
        <div className="max-w-screen-2xl flex flex-wrap gap-1 items-center justify-between mx-auto">
          <div className="flex justify-end items-center">
            <Link className="flex items-center" href="/">
              <Kcc3 className="h-20 lg:h-[90px] p-2 flex justify-end items-center w-auto" />
              <h2 className="text-lg block md:text-xl">Kara's Chicken Coop</h2>
            </Link>
          </div>
          <div className="flex md:order-2 space-x-3 lg:gap-3 md:space-x-0 rtl:space-x-reverse items-center">
            <div className="hidden sm:block "></div>
            <div className="flex">
              <CartButton onClick={handleCartButtonClick}>Shop</CartButton>
              <div className={`indicator ${hasItems ? "visible" : "hidden"}`}>
                <span className="indicator-item badge indicator-start  badge-secondary bg-floc-yellow border-floc-yellow"></span>
                </div>
            </div>
            
            <div className="hidden lg:block">
              <Link href="/checkout">
                <button className=" pr-5 pl-5 pt-3 pb-3 border-solid border-[.25em] border-floc-gray text-floc-gray uppercase">
                  Checkout
                </button>
              </Link>
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
                "flex p-4 md:p-0 mt-4 border w-full border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent",
                navMenu ? "flex-col min-w-full" : ""
              )}
            >
              <li>
                <a
                  href="/#MeetTheChickens"
                  className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40 jose"
                >
                  Meet The Chickens
                </a>
              </li>
              <li>
                <a
                  href="/#OurFlock"
                  className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40"
                >
                  Who We Are
                </a>
              </li>
              <li>
                <a
                  href="/#ChickenGallery"
                  className="block py-2 px-3 md:p-0  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40"
                >
                  Follow Us
                </a>
              </li>
              <li className={clsx(navMenu ? "block md:hidden" : "hidden")}>
                <a
                  href="#"
                  className={clsx(
                    " py-2 px-3 md:p-0 bg-floc-gray text-gray-100 tracking-wider text-center rounded hover:bg-floc-gray/90 md:hover:bg-transparent md:hover:text-floc-gray/40",
                    navMenu ? "block md:hidden" : "hidden"
                  )}
                >
                  Checkout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <SlideCart
        open={open}
        setOpen={setOpen}
      ></SlideCart>
    </>
  );
}
