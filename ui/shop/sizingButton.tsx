"use client";
import { Quando } from "next/font/google";
import React, { useState, useEffect } from "react";

interface SizingButtonProps {
  size: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean; // Add disabled prop with optional flag
  quantity: number;
}

const SizingButton: React.FC<SizingButtonProps> = ({
  size,
  selected,
  onClick,
  disabled,
  quantity,
}) => {
  return (
    <div className="relative inline-block group">
      <button
        className={`bg-gray-100 border border-gray-300 rounded-sm w-10 h-10 focus:ring-gray-100 focus:ring-2 focus:outline-none ${
          quantity < 1 ? "bg-gray-50 border-0" : ""
        } ${selected ? "bg-light-yellow/50" : ""}`}
        onClick={onClick}
        disabled={quantity < 1}
      >
        {size}
      </button>
      {quantity < 1 && (
        <>
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              className="h-full w-full"
            >
              <line
                x1="5"
                y1="25"
                x2="25"
                y2="5"
                stroke="gray"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="absolute z-50 opacity-0 group-hover:opacity-100 bg-gray-100 text-gray-500 text-center p-1 rounded-md top-10 w-20 left-1/2 transform -translate-x-1/2 pointer-events-none transition-opacity duration-300">
            Out of stock
          </div>
        </>
      )}
    </div>
  );
};

export default SizingButton;
