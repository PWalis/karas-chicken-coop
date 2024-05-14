"use client";
import barnhousefooter from "../assets/barnhouse-footer.png";
import Image from "next/image";
import { useRef, useState } from "react";
import { SectionWrapper } from "../assets/animation/section-wrapper";
import { createEmail } from "@/app/lib/email";
import { create } from "domain";
export default function JoinTheFlock() {
  const ref = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState<string>("");
  const [valid, setValid] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(true);

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email.");
      setValid(false);
      setEmailValid(false);

      return;
    }

    try {
      // Submit form logic
      setValid(true);
      setEmailValid(true);
      setMessage("Your email has been successfully submitted!");
      await createEmail(formData);
      ref.current?.reset();
      setTimeout(() => {
        setValid(true);
        setMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error submitting email:", error);
    }
  };

  return (
    <SectionWrapper>
      <section
        id="JoinTheFlock"
        className="bg-cover relative newsletter h-screen"
      >
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md sm:text-center">
            <h2 className="mb-4 font-extrabold text-floc-gray text-5xl lg:text-8xl mt-20 uppercase text-center">
              Join The Flock
            </h2>
            <p className="mx-auto mb-2 font-light text-gray-500 md:mb-4 sm:text-xl max-w-screen-sm text-center">
              join our newsletter and be among the first to discover specials,
              re-stocks, and so much more!
            </p>
            <SectionWrapper>
              <form onSubmit={handleSubmit} ref={ref}>
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
                      className={`block p-3 pl-10 w-full text-md text-gray-900 bg-white rounded-md border focus:ring-gray-200 focus:border-gray-100 ${
                       !emailValid? "border-red-500" : "border-gray-200"} `}
                      placeholder="Enter your email..."
                      type="email"
                      id="email"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className=" rounded-md py-3 px-5 w-full text-sm font-medium text-center text-white  border cursor-pointer bg-primary-700 border-primary-600 hover:bg-floc-gray/90 focus:ring-4 focus:ring-gray-200  bg-floc-gray"
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
                {message && <p className={`text-sm text-center mx-auto bg-white/90 w-fit p-1 m-1 ${valid ? "text-[#5a8a54]" : "text-red-500"}`}>{message}</p>}
                <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer rounded-md bg-white/20">
                  <div className="bg-white/30 backdrop-blur-sm p-2">
                    <p>
                      By submitting your email, you agree to sign up for our
                      newsletter and receive promotional emails.
                    </p>
                  </div>
                </div>
              </form>
            </SectionWrapper>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
