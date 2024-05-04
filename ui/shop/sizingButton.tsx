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
      className={`bg-gray-100   border border-gray-300 rounded-sm w-10 h-10 focus:ring-gray-100  focus:ring-2 focus:outline-none ${selected ? 'bg-gray-300 ' : ''}`}
      onClick={onClick}
    >
      {size}
    </button>
  );
};

export default SizingButton;
