import React from "react";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          Username
          <input type="email" />
        </label>
        <label>
          Password
          <input type="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}