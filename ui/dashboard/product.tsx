"use client";

import React, {useState} from "react";
import { formatCurrency } from "@/app/lib/utils";
import Link from "next/link";
import { deleteProduct } from "@/app/lib/actions";
import clsx from "clsx";

interface ProductProps {
  productId: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  inventory: {
    xs_quantity: number;
    s_quantity: number;
    m_quantity: number;
    l_quantity: number;
    xl_quantity: number;
    xxl_quantity: number;
  };
}

export const Product: React.FC<ProductProps> = ({
  productId,
  name,
  price,
  description,
  images,
  category,
  inventory,
}) => {

  const [deleting, setDeleting] = useState(false)
  const [visible, setVisible] = useState(true)

  const handleDelete = async() => {
    setDeleting(true)
    await deleteProduct(productId)
    setVisible(false)
  }

  return (
    <div className={clsx("flex flex-row bg-gray-200 rounded-2xl shadow-2xl max-w-[85%]", visible ? "" : "hidden")}>
      <div className="flex flex-row gap-5 justify-center overflow-auto max-h-36 w-[30%]">
        {images.map((image, index) => {
          return (
            <img
              src={image}
              alt={index.toString()}
              className="object-contain w-32 h-32 rounded-xl mt-1"
              key={index}
            />
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="text-lg">Price: {formatCurrency(price)}</p>
        <p className="text-lg">Category: {category}</p>
      </div>
      <div className="flex flex-col gap-2 pt-10 pl-5">
        <p className="text-lg">XS: {inventory.xs_quantity}</p>
        <p className="text-lg">Small: {inventory.s_quantity}</p>
        <p className="text-lg">Medium: {inventory.m_quantity}</p>
      </div>
      <div className="flex flex-col gap-2 pt-10 pl-10">
        <p className="text-lg">Large: {inventory.l_quantity}</p>
        <p className="text-lg">XL: {inventory.xl_quantity}</p>
        <p className="text-lg">XXL: {inventory.xxl_quantity}</p>
      </div>
      <div className="flex justify-center h-full">
        <Link href={`/dashboard/edit/${productId}`}>
          <button className="bg-blue-500 text-white p-2 rounded-xl max-h-10 m-auto">
            Edit Product
          </button>
        </Link>
        <button onClick={handleDelete} className="max-h-10 px-2 rounded-xl bg-red-500">{deleting ? "In Progress..." : "Delete"}</button>
      </div>
    </div>
  );
};
