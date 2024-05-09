"use client";
import barnhousefooter from "../assets/barnhouse-footer.png";
import Image from "next/image";
import { useRef } from "react";
import { SectionWrapper } from "../assets/animation/section-wrapper";
import { createEmail } from "@/app/lib/email";
import { create } from "domain";
export default function JoinTheFlock() {

  const ref = useRef<HTMLFormElement>(null);

  return (
    <SectionWrapper>
      <section
        id="JoinTheFlock"
        className="bg-cover relative newsletter h-screen"
      >
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md sm:text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-floc-gray sm:text-6xl lg:text-8xl mt-20 uppercase">
              Join The Flock
            </h2>
            <p className="mx-auto mb-2 font-light text-gray-500 md:mb-4 sm:text-xl max-w-screen-sm">
              join our newsletter and be among the first to discover specials,
              re-stocks, and so much more!
            </p>
            <SectionWrapper>
              <form
                action={async (formData) => {
                  await createEmail(formData);
                  ref.current?.reset();
                }}
                ref={ref}
              >
                <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0 gap-3">
                  <div className="relative w-full">
                    <label
                      htmlFor="email"
                      className="hidden mb-2 text-sm font-medium text-gray-900 "
                    >
                      Email address
                    </label>

                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <input
                      name="email"
                      className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter your email..."
                      type="email"
                      id="email"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="py-3 px-5 w-full text-sm font-medium text-center text-white  border cursor-pointer bg-primary-700 border-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300  bg-floc-gray"
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
                <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer ">
                  by submitting your email, you agree to sign up for our
                  newsletter and receive promotional emails.
                </div>
              </form>
            </SectionWrapper>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
