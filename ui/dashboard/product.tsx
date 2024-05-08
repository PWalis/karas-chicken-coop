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
  primaryImage: string;
  // images: string[];
  category: string;
  inventory: {
    hasSizes: boolean;
    quantity: number;
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
  primaryImage,
  // images,
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
        "flex flex-col sm:flex-row items-center drop-shadow-sm border-blue-gray/60 border-[1.5px] hover:drop-shadow-md sm:min-w-[500px] max-w-[500px] bg-white h-fill text-center sm:text-left m-4 mb-4 w-fit sm:justify-between pb-2 sm:pb-0 sm:pr-2 rounded-lg",
        visible ? "" : "hidden"
      )}
    >
      <div className="flex flex-col justify-center place-items-center overflow-auto h-fill w-fill sm:max-h-64 sm:max-w-48 sm:mr-4">
        <img
          src={primaryImage}
          alt={"1"}
          className="object-fill rounded-lg "
          key={"1"}
        />
      </div>
      <div className="flex flex-col w-full pt-2">
        <div className="flex flex-col w-full justify-evenly sm:justify-start items-center sm:items-start">
          <h3 className="text-2xl font-bold mb-3">{name}</h3>
          <div className="flex gap-2 place-items-end justify-end">
            <Link href={`/dashboard/edit/${productId}`}>
              <button className="bg-cyan-300 bg-left-top hover:bg-cyan-200 text-white p-2 rounded-xl max-h-10 m-auto">
                <EditIcon className="w-6 h-6"> </EditIcon>
              </button>
            </Link>
            <button
              onClick={() => setShowConfirmation(true)}
              className="max-h-10 p-2 rounded-xl bg-right-top bg-orange-300 hover:bg-orange-200"
            >
              {deleting ? (
                "In Progress..."
              ) : (
                <DeleteIcon className="w-6 h-6"></DeleteIcon>
              )}
            </button>
          </div>
        </div>
        <p className="text-lg"> Price USD: {formatCurrency(price)}</p>
        <div className="text-lg">
          <p className=""> Category: {category}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between place-items-center">
        {inventory.hasSizes ? (
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
        ) : (
          <div className="text-lg  flex gap-1  sm:justify-end">
             <p className="">Qty: </p>
            <p className="border-2 px-2">{inventory.quantity}</p>
          </div>
        )}
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
