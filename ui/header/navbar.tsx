"use client";

import Link from "next/link";
import { ShopButton, HamburgerMenu, Logo, JoinTheFlockButton } from "./buttons";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import Kcc3 from "../assets/svgs/Kcc3";
import { motion, AnimatePresence } from "framer-motion";


export default function NavBar() {
  const [navMenu, setNavMenu] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  

const handleHamburgerClick = () => {
    setNavMenu(!navMenu);
    console.log("nav clicked");
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setNavMenu(false);
      }
    };

    if (navMenu) {
      document.body.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, [navMenu]);

  const handleLinkClick = () => {
    setNavMenu(false); // Close the nav menu when a link is clicked
  };

  return (
    <nav ref={navRef} className="bg-white/90 backdrop-blur-md  dark:bg-gray-900 font-bold text-sm uppercase fixed w-full top-0 z-50">
      <div className="max-w-screen-2xl flex flex-wrap gap-1 items-center justify-between mx-auto">
        <div className="flex justify-end items-center">
          <Link className="flex items-center" href="/">
            <Kcc3 className="h-20 lg:h-[90px] p-2 flex justify-end items-center w-auto" />
            <h2 className="text-lg block md:text-xl">Kara's Chicken Coop</h2>
          </Link>
        </div>
        <div className="flex md:order-2 space-x-3 gap-3 md:space-x-0 rtl:space-x-reverse">
          <div className="hidden sm:block">
            <ShopButton>Shop</ShopButton>
          </div>
          <div className="hidden lg:block">
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
            "items-center justify-between md:flex md:w-auto md:order-1 text-lg text-floc-gray",
            navMenu ? "flex relative pr-2.5 w-full" : "hidden"
          )}
          id="navbar-cta"
        >
          <ul
            className={clsx(
              "flex p-4 md:p-0 mt-1 w-full rounded-lg bg-gray-50/10 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent",
              navMenu ? "flex-col min-w-full" : ""
            )}
          >
            <li>
              <a
                href="/#MeetTheChickens"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40 jose"
                onClick={handleLinkClick}
              >
                Meet The Chickens
              </a>
            </li>
            <li>
              <a
                href="/#OurFlock"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40"
                onClick={handleLinkClick}
              >
                Who We Are
              </a>
            </li>
            <li>
              <a
                href="/#ChickenGallery"
                className="block py-2 px-3 md:p-0  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40"
                onClick={handleLinkClick}
              >
                Follow Us
              </a>
            </li>
            <li className={clsx(navMenu ? "block sm:hidden" : "hidden")}>
              <a
                href="#"
                className={clsx(
                  " py-2 px-3 md:p-0  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40",
                  navMenu ? "block md:hidden" : "hidden"
                )}
                onClick={handleLinkClick}
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
