import React from "react";
import { Checkbox } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/lib/sessionHandler";

export const ListNewProduct: React.FC = () => {
  return <button className="">Add Product</button>;
};

export const LogOut: React.FC = () => {
  const router = useRouter()

  const logOutHandler = async () => {
    await logout()
    router.push("/login")
  }
  return (
    <button onClick={logOutHandler} className="text-left px-4 py-3 bg-floc-gray text-white hover:bg-floc-gray/70">
      Log Out
    </button>
  );
};

export const LogIn: React.FC = () => {
  return <button  className="">Log In</button>;
};

