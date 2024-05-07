"use client";
import React, { useState } from 'react';
import SizingButton from './sizingButton';

interface SizingProps {
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
}

export const Sizing: React.FC<SizingProps> = ({ size, setSize }) => {

  const handleSelectSize = (size: string) => {
    setSize(size);
  };



  return (
    <div className="flex gap-4 mb-3 w-full">
      <SizingButton size="XS" selected={size === "XS"} onClick={() => handleSelectSize("XS")} />
      <SizingButton size="S" selected={size === "S"} onClick={() => handleSelectSize("S")} />
      <SizingButton size="M" selected={size === "M"} onClick={() => handleSelectSize("M")} />
      <SizingButton size="L" selected={size === "L"} onClick={() => handleSelectSize("L")} />
      <SizingButton size="XXL" selected={size === "XXL"} onClick={() => handleSelectSize("XXL")} />
    </div>
  );
};

export default Sizing;
