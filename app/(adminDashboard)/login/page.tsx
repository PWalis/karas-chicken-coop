"use client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

import { login } from "@/app/lib/sessionHandler";

export default function Login() {
  const initialState = { message: "", error: {} };
  const [state, formAction] = useFormState(login, initialState as any);

  return (
    <div className="min-h-screen h-fit dashboard-bg bg-cover">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl sm:text-5xl mb-4 text-center max-w-[400px] tracking-wide">
          Kara's Chicken Coop Dashboard
        </h1>
        <div className="max-w-[400px]">
          <h2 className="text-2xl font-bold tracking-wide p-2 text-center uppercase">
            Login
          </h2>
          <form className="flex flex-col gap-2" action={formAction}>
            <label className="input input-bordered max-w-[400px] flex items-center gap-2 bg-white text-floc-gray">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                name="email"
                type="text"
                className="grow  border-white text-gray-500 focus:outline-none focus:border-gray-100 focus:border-0  focus:ring-transparent "
                placeholder="Username"
              />
            </label>
            {state.error?.email &&
              state.error.email.map((error: string) => (
                <p className="text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            <label
              htmlFor="password"
              className="input input-bordered max-w-[400px] flex items-center gap-2 bg-white text-floc-gray"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                name="password"
                type="password"
                className="grow border-white text-gray-500 focus:outline-none focus:border-gray-100 focus:border-0  focus:ring-transparent "
                placeholder="Password"
              />
            </label>
            {state.error?.password &&
              state.error.password.map((error: string) => (
                <p className="text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            <SubmitButton />
            {state.error?.user &&
              state.error.user.map((error: string) => (
                <p className="text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            {state.error?.login &&
              state.error.login.map((error: string) => (
                <p className="text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </form>
        </div>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="mx-auto flex justify-center w-full px-4 py-2 bg-yellow-200 hover:bg-yellow-100"
      type="submit"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}
