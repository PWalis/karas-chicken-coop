import Kcc3 from "../assets/svgs/Kcc3";
import FacebookIcon from "@/ui/assets/icons/Facebook-icon";
import InstagramIcon from "@/ui/assets/icons/Instagram-icon";
import YoutubeIcon from "@/ui/assets/icons/Youtube-icon";
import TiktokIcon from "@/ui/assets/icons/tiktok-icon";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <Kcc3 className="h-20 w-20" />
              <span className="self-center text-xl pl-2 font-semibold whitespace-nowrap uppercase">
                Kara's Chicken Coop
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <a href="/">
                <h2 className="mb-6 text-sm font-semibold text-floc-gray uppercase">
                  HOME
                </h2>
              </a>
              <ul className="text-floc-gray/70 font-medium">
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
              <ul className="text-floc-gray/70 dark:text-gray-400 font-medium">
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
              <ul className="text-floc-gray/70 dark:text-gray-400 font-medium">
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
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-floc-gray/60 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="/" className="hover:text-floc-gray/30">
              Kara's Chicken Coop™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a
              href="#"
              className="text-floc-gray/40 hover:text-floc-gray/20 dark:hover:text-white"
            >
              <FacebookIcon className="w-6 h-6"></FacebookIcon>
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <InstagramIcon className="w-6 h-6"></InstagramIcon>
              <span className="sr-only">Discord community</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <TiktokIcon className="w-6 h-6"></TiktokIcon>
              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <YoutubeIcon className="w-6 h-6"></YoutubeIcon>
              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
