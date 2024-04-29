"use client";
import React, { useState } from 'react';
import SizingButton from './sizingButton';

const Sizing: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState('');

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <div className="flex gap-2 mb-3">
      <SizingButton size="XS" selected={selectedSize === "XS"} onClick={() => handleSelectSize("XS")} />
      <SizingButton size="S" selected={selectedSize === "S"} onClick={() => handleSelectSize("S")} />
      <SizingButton size="M" selected={selectedSize === "M"} onClick={() => handleSelectSize("M")} />
      <SizingButton size="L" selected={selectedSize === "L"} onClick={() => handleSelectSize("L")} />
      <SizingButton size="XXL" selected={selectedSize === "XXL"} onClick={() => handleSelectSize("XXL")} />
    </div>
  );
};

export default Sizing;
