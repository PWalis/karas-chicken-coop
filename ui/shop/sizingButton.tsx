"use client";
import React, { useState } from 'react';

interface SizingButtonProps {
  size: string;
  selected: boolean;
  onClick: () => void;
}

const SizingButton: React.FC<SizingButtonProps> = ({ size, selected, onClick }) => {
  return (
    <button
      className={`bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-sm w-10 h-10 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none ${selected ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
      onClick={onClick}
    >
      {size}
    </button>
  );
};

export default SizingButton;
