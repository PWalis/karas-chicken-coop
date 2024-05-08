"use client";
import React, { useState, useEffect, useRef } from "react";
import { HamburgerMenu } from "../header/buttons";
import EditIcon from "../assets/icons/EditIcon";
import CreateIcon from "../assets/icons/CreateIcon";
import ShirtIcon from "../assets/icons/ShirtIcon";
import clsx from "clsx";

export default function MobileNav() {
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

  return (
    <nav
      ref={navRef}
      className="bg-gray-200/90 dashboard-bg bg-cover border-gray-200 dark:bg-gray-900 font-bold text-sm uppercase fixed w-full top-0 z-50"
    >
      <div className="max-w-screen-xl flex flex-wrap gap-1 items-center justify-between mx-auto">
        <div className="flex justify-end items-center px-6 py-6">
          <a className="flex items-center" href="/dashboard">
            <h2 className="text-2xl block">Kara's Dashboard</h2>
          </a>
        </div>
        <div className="flex md:order-2 space-x-3 gap-3 md:space-x-0 rtl:space-x-reverse">
          <div className="pr-2">
            <HamburgerMenu
              handleHamburgerClick={handleHamburgerClick}
            ></HamburgerMenu>
          </div>
        </div>
        <div
          className={clsx(
            "items-center justify-between md:flex md:w-auto md:order-1 text-floc-gray/90",
            navMenu ? "flex relative w-full" : "hidden"
          )}
          id="navbar-cta"
        >
          <ul
            className={clsx(
              "flex p-4 md:p-0  min-w-full rounded-lg md:bg-transparent text-lg font-light gap-3 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0",
              navMenu ? "flex-col min-w-full" : ""
            )}
          >
            <li>
              <a
                href="/dashboard/orders"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-400/10 md:hover:bg-transparent md:hover:text-floc-gray/80 jose"
              >
                <div className="flex items-center gap-1">
                  <ShirtIcon className="w-6 h-6"></ShirtIcon>
                  <p>View Orders</p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/products"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-400/10  md:hover:bg-transparent md:hover:text-floc-gray/80"
              >
                <div className="flex items-center gap-1">
                  <EditIcon className="w-6 h-6"></EditIcon>
                  <p>Manage Products</p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/createNewProduct"
                className="block py-2 px-3 md:p-0  rounded hover:bg-gray-400/10 md:hover:bg-transparent md:hover:text-floc-gray/80"
              >
                <div className="flex items-center gap-1">
                  <CreateIcon className="w-6 h-6"></CreateIcon>
                  <p>Create Product</p>
                </div>
              </a>
            </li>
            <li className={clsx(navMenu ? "block sm:hidden" : "hidden")}>
              <a
                href="#"
                className={clsx(
                  " py-2 px-3 md:p-0  rounded bg-floc-gray text-center text-white hover:bg-floc-gray/70  mt-2 md:hover:bg-transparent",
                  navMenu ? "block md:hidden" : "hidden"
                )}
              >
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
