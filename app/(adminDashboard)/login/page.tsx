import React from "react";

import { login } from "@/app/lib/sessionHandler";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form action={login}>
        <label htmlFor="email">
          Username
          <input name="email" type="email" />
        </label>
        <label htmlFor="password">
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
