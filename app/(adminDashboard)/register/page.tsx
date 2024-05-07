import { register } from "@/app/lib/register";

export default function Page() {
  return (
    <div>
      <h1>Register</h1>
      <form action={register}>
        <label htmlFor="email">
          Email
          <input name="email" type="email" />
        </label>
        <label htmlFor="password">
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
