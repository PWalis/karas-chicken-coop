import React from "react";

interface ProductDescriptionProps {
    name: string;
    description: string;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ name, description }) => {
  return (
    <div className="">
      <h2 className="text-6xl mb-1 ">{name}</h2>
      <p className="text-4xl mb-2 text-floc-gray"> $25.00 </p>
      <h3 className="max-w-[500px]">
        {description}
      </h3>
    </div>
  );
};
