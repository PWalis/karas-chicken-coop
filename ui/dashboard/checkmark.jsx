"use client";
import { Checkbox } from "@material-tailwind/react";

export const CheckMark = ({ fulfillOrder }) => {
  return (
    <Checkbox
      ripple={false}
      color="teal"
      className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
      onChange={(e) => {
        fulfillOrder();
      }}
    />
  );
};
