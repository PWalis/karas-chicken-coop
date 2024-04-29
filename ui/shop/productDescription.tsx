import React from "react";

interface ProductDescriptionProps {
    name: string;
    description: string;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ name, description }) => {
  return (
    <div className="mb-5">
      <h2 className="text-6xl mb-2">{name}</h2>
      <h3 className="max-w-[500px]">
        {description}
      </h3>
      <p className="text-floc-gray/60 pt-2">
        material is made 60% cotton 40% polyester
      </p>
    </div>
  );
};
