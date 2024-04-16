import React from "react";
import { ListNewProduct, LogOut } from "./buttons";

export const Header = () => {
  return (
    <header className="flex gap-5 justify-end pr-5">
      <ListNewProduct />
      <LogOut />
    </header>
  );
};
