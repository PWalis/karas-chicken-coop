import Image from "next/image";
import { ShopButton, HamburgerMenu, Logo, JoinTheFlockButton } from "./buttons";
import Kcc3 from "../assets/svgs/Kcc3";
import KKChickenOnlyLogo from "../assets/svgs/kcc-chicken-only-logo";
export default function NavBar() {
  return (
    

<nav className="bg-white/90 border-gray-200 dark:bg-gray-900 font-bold text-sm uppercase sticky top-0 z-50">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
    <div className="flex justify-end items-center">
    <Kcc3 className="h-20 lg:h-28 p-2 flex justify-end items-center w-auto"/>
    <h2 className="text-lg md:text-xl">Kara's Chicken Coop</h2>
    </div>
  <div className="flex md:order-2 space-x-3 gap-3 md:space-x-0 rtl:space-x-reverse">
      <ShopButton>Shop</ShopButton>
      <div className="hidden md:block">
      <JoinTheFlockButton></JoinTheFlockButton>
      </div>
      <HamburgerMenu></HamburgerMenu>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 text-floc-gray" id="navbar-cta">
    <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
      <li>
        <a href="#" className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40 jose">Meet The Chickens</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40 ">Who We Are</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-3 md:p-0  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-floc-gray/40">Socials</a>
      </li>
    </ul>
  </div>
  </div>
</nav>

  );
}
