import { useState } from "react";
import { HamburgerMenu } from "../header/buttons";
import clsx from "clsx";

export default function MobileNav() {
    const [navMenu, setNavMenu] = useState(false);
  

const handleHamburgerClick = () => {
    setNavMenu(!navMenu);
    console.log("nav clicked");
  };

  return (
    <nav className="bg-floc-yellow/90 border-gray-200 dark:bg-gray-900 font-bold text-sm uppercase fixed w-full top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap gap-1 items-center justify-between mx-auto">
        <div className="flex justify-end items-center px-6 py-6">
          <a className="flex items-center" href="/">
          <h2 className="text-xl block">Kara's Dashboard</h2>
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
            "items-center justify-between md:flex md:w-auto md:order-1 text-floc-gray",
            navMenu ? "flex relative w-full" : "hidden"
          )}
          id="navbar-cta"
        >
          <ul
            className={clsx(
              "flex p-4 md:p-0 border min-w-full border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white",
              navMenu ? "flex-col min-w-full" : ""
            )}
          >
            <li>
              <a
                href="/dashboard/orders"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40 jose"
              >
                View Orders
              </a>
            </li>
            <li>
              <a
                href="/dashboard/products"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40"
              >
                View Products
              </a>
            </li>
            <li>
              <a
                href="/dashboard/newproduct"
                className="block py-2 px-3 md:p-0  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40"
              >
                New Product
              </a>
            </li>
            <li className={clsx(navMenu ? "block sm:hidden" : "hidden")}>
              <a
                href="#"
                className={clsx(
                  " py-2 px-3 md:p-0  rounded bg-floc-gray text-center text-white hover:bg-floc-gray/50 md:hover:bg-transparent",
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