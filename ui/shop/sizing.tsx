"use client";
import React, { useState, useEffect } from 'react';
import SizingButton from './sizingButton';

interface SizingProps {
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  inventory: any;
}

export const Sizing: React.FC<SizingProps> = ({ size, setSize, inventory }) => {

  const handleSelectSize = (size: string) => {
    setSize(size);
  };
  
  console.log(inventory.xs_quantity)



  


  return (
    <div className="flex gap-3 mb-3 w-full">
      <SizingButton quantity={inventory.xs_quantity} size="xs" selected={size === "XS"} onClick={() => handleSelectSize("XS")} />
      <SizingButton quantity={inventory.s_quantity} size="s" selected={size === "S"} onClick={() => handleSelectSize("S")} />
      <SizingButton quantity={inventory.m_quantity} size="m" selected={size === "M"} onClick={() => handleSelectSize("M")} />
      <SizingButton quantity={inventory.l_quantity} size="l" selected={size === "L"} onClick={() => handleSelectSize("L")} />
      <SizingButton quantity={inventory.xl_quantity} size="xl" selected={size === "XL"} onClick={() => handleSelectSize("XL")} />
      <SizingButton quantity={inventory.xxl_quantity} size="xxl" selected={size === "XXL"} onClick={() => handleSelectSize("XXL")} />
    </div>
  );
};

export default Sizing;
