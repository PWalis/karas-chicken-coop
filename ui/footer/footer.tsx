"use client";
import { createEmail } from "@/app/lib/email";
import { useRef } from "react";
import Kcc3 from "../assets/svgs/Kcc3";
import FacebookIcon from "@/ui/assets/icons/Facebook-icon";
import InstagramIcon from "@/ui/assets/icons/Instagram-icon";
import YoutubeIcon from "@/ui/assets/icons/Youtube-icon";
import TiktokIcon from "@/ui/assets/icons/tiktok-icon";

export default function Footer() {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <footer className="bg-gray-50  dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <Kcc3 className="h-20 w-20" />
              <span className="self-center text-xl pl-2 font-semibold whitespace-nowrap uppercase">
                Kara's Chicken Coop
              </span>
            </a>
            <div className="flex-col flex lg:flex-row justify-center place-items-center lg:place-items-baseline lg:gap-2 text-center mt-4 m-2">
              <p className="text-xl sm:text-left">
                {" "}
                Join the Flock!{" "}
              </p>
              <div className="w-full sm:max-w-[300px]">
                <form
                  className="flex flex-col lg:flex-row"
                  ref={ref}
                  action={async (formData) => {
                    await createEmail(formData);
                    ref.current?.reset();
                  }}
                >
                  <label className="input input-bordered flex items-center gap-2 bg-white text-floc-gray">
                    Email
                    <input
                      type="text"
                      className="grow border-white text-gray-500 focus:outline-none focus:border-gray-100 focus:border-0  focus:ring-transparent "
                      placeholder="youremail@site.com"
                      name="email"
                    />
                  </label>
                  <div>
                    <button
                      type="submit"
                      className="py-3 px-5 w-full text-sm font-medium text-center text-white  border cursor-pointer bg-primary-700 border-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 mt-1  bg-floc-gray"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
                <p className="text-xs text-floc-gray/70 pt-2">
                  by submitting your email, you agree to sign up for our
                  newsletter and receive promotional emails.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <a href="/">
                <h2 className="mb-6 text-sm font-semibold text-floc-gray uppercase">
                  HOME
                </h2>
              </a>
              <ul className="text-floc-gray/90 font-medium">
                <li className="mb-4">
                  <a
                    href="/#MeetTheChickens"
                    className="hover:text-floc-gray/40"
                  >
                    Meet The Chickens
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/#OurFlock" className="hover:text-floc-gray/40">
                    Our Flock
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="/#ChickenGallery"
                    className="hover:text-floc-gray/40"
                  >
                    Chicken Gallery
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-floc-gray/90 dark:text-gray-400 font-medium">
                <li className="mb-2">
                  <a
                    className="hover:text-floc-gray/40"
                    style={{ display: "table-cell" }}
                    href="https://www.facebook.com/FlaminHotChickens"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="hover:text-floc-gray/40"
                    style={{ display: "table-cell" }}
                    href="https://www.instagram.com/karaschickens/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="hover:text-floc-gray/40"
                    style={{ display: "table-cell" }}
                    href="https://www.tiktok.com/@karas.chicken.coop"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tik Tok
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-floc-gray/40"
                    style={{ display: "table-cell" }}
                    href="https://www.youtube.com/channel/UCs5wYfoADhI94TLGWbEMdYQ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Youtube
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                FAQs
              </h2>
              <ul className="text-floc-gray/90 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="/shop/#FAQ" className="hover:text-floc-gray/40">
                    Shop FAQ
                  </a>
                </li>
                <li>
                  <a href="/shop/#FAQ" className="hover:text-floc-gray/40">
                    Return &amp; Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between text-center">
          <span className="text-sm text-floc-gray/60 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="/" className="hover:text-floc-gray/30">
              Kara's Chicken Coop™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 justify-center sm:mt-0">
            <a
              href="#"
              className="text-floc-gray/40 hover:text-floc-gray/20 dark:hover:text-white"
            >
              <FacebookIcon className="w-8 h-8"></FacebookIcon>
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <InstagramIcon className="w-8 h-8"></InstagramIcon>
              <span className="sr-only">Instagram community</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <TiktokIcon className="w-8 h-8"></TiktokIcon>
              <span className="sr-only">TikTok Page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <YoutubeIcon className="w-8 h-8"></YoutubeIcon>
              <span className="sr-only">Youtube account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
