import React from "react";
import { Checkbox } from "@material-tailwind/react";

export const ListNewProduct: React.FC = () => {
  return <button className="">Add Product</button>;
};

export const LogOut: React.FC = () => {
  return (
    <button className="text-left px-4 py-3 bg-floc-gray text-white hover:bg-floc-gray/70">
      Log Out
    </button>
  );
};

export const LogIn: React.FC = () => {
  return <button className="">Log In</button>;
};

interface sizeOptionButtonProps {
  onClick: () => {};
}

export const sizeOptionButton: React.FC<sizeOptionButtonProps> = ({
  onClick,
}) => {
  return (
    <button onClick={onClick}>
      <Checkbox
        ripple={false}
        color="teal"
        className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
      />
    </button>
  );
};
