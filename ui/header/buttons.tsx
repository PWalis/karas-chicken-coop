// NAVBAR BUTTONS
import React from "react";
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Logo({}: Readonly<{}>) {
  return (
    <div className="">
      <svg
        width="150"
        height="90"
        viewBox="0 0 504 262"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="504" height="262" fill="url(#pattern0_61_35)" />
        <defs>
          <pattern
            id="pattern0_61_35"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_61_35"
              transform="scale(0.00198413 0.00381679)"
            />
          </pattern>
          <image
            id="image0_61_35"
            width="504"
            height="262"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    </div>
  );
}

export function ShopButton({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const handleClick = () => {
    router.push('/shop')
  }

  return (
    <button onClick={handleClick} className="w-full h-full sm:block pr-5 pl-5 pt-3 pb-3 bg-floc-yellow uppercase">
      <Link className="w-full h-full" key="shop" href="/shop">Shop</Link>
    </button>
  );
}

export function JoinTheFlockButton({}: Readonly<{}>) {
  return (
    <a href="/#JoinTheFlock">
    <button className=" pr-5 pl-5 pt-3 pb-3 border-solid border-[.25em] border-floc-gray text-floc-gray uppercase">
      Join The Flock
    </button>
    </a>
  );
}

interface hamburger {
  handleHamburgerClick: () => void
}

export const HamburgerMenu: React.FC<hamburger> = ({handleHamburgerClick}) => {
  return (
    <button
      onClick={handleHamburgerClick}
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-floc-gray rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      aria-controls="navbar-cta"
      aria-expanded="false"
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="w-10 h-10"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
  );
}

// HERO SECTION BUTTON
export function HeroCTA({}: Readonly<{}>) {
  return (
    <a
      href="/#JoinTheFlock"
      className="inline-flex items-center justify-center px-5 py-3 text-xl text-center text-floc-gray  bg-floc-yellow uppercase"
    >
      Join The Flock
    </a>
  );
}
