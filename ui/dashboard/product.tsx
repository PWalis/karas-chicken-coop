"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/app/lib/utils";
import Link from "next/link";
import { deleteProduct } from "@/app/lib/actions";
import clsx from "clsx";
import EditIcon from "../assets/icons/EditIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";

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
  const [deleting, setDeleting] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await deleteProduct(productId);
    setDeleting(false);
    setShowConfirmation(false);
    setVisible(false);
  };
  return (
    <div
      className={clsx(
        "flex flex-row drop-shadow-sm border-blue-gray/60 border-[1.5px] hover:drop-shadow-md bg-white h-fill rounded-md m-4 px-4 py-4 mb-4 w-fit",
        visible ? "" : "hidden"
      )}
    >
      <div className="flex flex-col justify-center place-items-center overflow-auto h-fit w-fit pr-2">
        {images.map((image, index) => {
          return (
            <img
              src={image}
              alt={index.toString()}
              className="object-cover w-32 h-32 rounded-xl mt-1"
              key={index}
            />
          );
        })}
        <h3 className="text-2xl font-bold">{name}</h3>
      </div>
      <div className="flex flex-col  gap-2">
        <p className="text-lg"> Price USD: {formatCurrency(price)}</p>
        <div className="text-lg">
          <p className=""> Category: {category}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between place-items-end">
        <div className="flex gap-2">
          <Link href={`/dashboard/edit/${productId}`}>
            <button className="bg-cyan-600 hover:bg-cyan-500 text-white p-2 rounded-xl max-h-10 m-auto">
              <EditIcon className="w-6 h-6"> </EditIcon>
            </button>
          </Link>
          <button
            onClick={() => setShowConfirmation(true)}
            className="max-h-10 p-2 rounded-xl bg-[#f43f5e]/90 hover:bg-[#f43f5e]/80"
          >
            {deleting ? (
              "In Progress..."
            ) : (
              <DeleteIcon className="w-6 h-6"></DeleteIcon>
            )}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2 justify-end place-items-end w-fit">
            <div className="text-lg place-items-center flex flex-col">
              <p className="border-2 px-2">{inventory.xs_quantity}</p>
              <p className="">XS</p>
            </div>
            <div className="text-lg place-items-center flex flex-col">
              <p className="border-2 px-2">{inventory.s_quantity}</p>
              <p className="">S</p>
            </div>
            <div className="text-lg place-items-center flex flex-col">
              <p className="border-2 px-2">{inventory.m_quantity}</p>
              <p className="">M</p>
            </div>
            <div className="flex gap-2">
            <div className="text-lg place-items-center flex flex-col">
              <p className="border-2 px-2">{inventory.l_quantity}</p>
              <p className="">L</p>
            </div>
            <div className="text-lg place-items-center flex flex-col">
              <p className="border-2 px-2">{inventory.xl_quantity}</p>
              <p className="">XL</p>
            </div>
            <div className="text-lg place-items-center flex flex-col">
              <p className="border-2 px-2">{inventory.xxl_quantity}</p>
              <p className="">XXL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md">
            <p className="text-lg mb-4">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 mr-4 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
