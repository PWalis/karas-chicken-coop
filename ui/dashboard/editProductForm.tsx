"use client";

import React from "react";
import Image from "next/image";
import { ImageEditor } from "./imageEditor";
import { updateProduct } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
interface ProductProps {
  productId: number;
  name: string;
  price: BigInt;
  description: string;
  primaryImage: string;
  images: string[];
  category: string;
  categories: any;
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

export const EditProductForm: React.FC<ProductProps> = ({
  name,
  price,
  description,
  category,
  inventory,
  primaryImage,
  images,
  productId,
  categories,
}) => {
  const updateProductWithProductId = updateProduct.bind(null, {
    productId: productId,
    images: images,
    primaryImage: primaryImage,
  });

  const options = categories.map((category: any, index: number) => {
    return (
      <option value={category.name} key={index}>
        {category.name}
      </option>
    );
  });

  return (
    <div className="flex justify-center w-full h-fit">
      <form
        action={updateProductWithProductId}
        className="flex flex-col gap-2 min-w-[346px] w-fit justify-center drop-shadow-md bg-white h-fill border rounded-md p-3 mb-4"
      >
        <div hidden>
          <input name="productId" value={productId}></input>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <div className="flex w-full flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={name}
              className="w-full"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price">Price</label>
            <input
              className="w-full min-w-[270px]"
              type="number"
              id="price"
              name="price"
              required
              defaultValue={Number(price) / 100}
            />
          </div>
        </div>
        <label htmlFor="description">Description</label>
        <textarea
          className="w-full"
          id="description"
          name="description"
          required
          defaultValue={description}
        />
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <div className="flex flex-col w-full">
            <label htmlFor="category">Category</label>
            <select
              className="w-full h-[42px]"
              id="category"
              name="category"
              defaultValue={category ? category : ""}
            >
              <option value={category ? category : ""} hidden>
                {category ? category : "Select an option"}
              </option>
              {options}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="newCategory"> New Category</label>
            <input
              className="w-full min-w-[270px]"
              type="text"
              name="newCategory"
              id="newCategory"
            />
          </div>
        </div>
        {inventory.hasSizes ? (
          <ul className="flex flex-row gap-2 justify-center">
            <div className="flex flex-wrap gap-3">
              <li className="flex flex-col">
                <label htmlFor="xs">XS</label>
                <input
                  className="max-w-10 h-10 p-1"
                  type="number"
                  id="xs"
                  name="xs"
                  required
                  defaultValue={inventory.xs_quantity}
                />
              </li>
              <li className="flex flex-col">
                <label htmlFor="small">Small</label>
                <input
                  className="max-w-10 h-10 p-1"
                  type="number"
                  id="small"
                  name="small"
                  required
                  defaultValue={inventory.s_quantity}
                />
              </li>
              <li className="flex flex-col">
                <label htmlFor="medium">Medium</label>
                <input
                  className="max-w-10 h-10 p-1"
                  type="number"
                  id="medium"
                  name="medium"
                  required
                  defaultValue={inventory.m_quantity}
                />
              </li>
            </div>
            <div className="flex gap-2">
              <li className="flex flex-col">
                <label htmlFor="large">Large</label>
                <input
                  className="max-w-10 h-10 p-1"
                  type="number"
                  id="large"
                  name="large"
                  required
                  defaultValue={inventory.l_quantity}
                />
              </li>
              <li className="flex flex-col">
                <label htmlFor="xl">XL</label>
                <input
                  className="max-w-10 h-10 p-1"
                  type="number"
                  id="xl"
                  name="xl"
                  required
                  defaultValue={inventory.xl_quantity}
                />
              </li>
              <li className="flex flex-col">
                <label htmlFor="xxl">XXL</label>
                <input
                  className="max-w-10 h-10 p-1"
                  type="number"
                  id="xxl"
                  name="xxl"
                  required
                  defaultValue={inventory.xxl_quantity}
                />
              </li>
            </div>
          </ul>
        ) : (
          <div className="flex flex-col">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              required
              defaultValue={inventory.quantity}
            />
          </div>
        )}
        <div className="flex flex-row flex-wrap w-full">
          <div className="flex flex-col justify-center">
            <label htmlFor="primaryImage">Primary Image</label>
            <input type="file" id="primaryImage" name="primaryImage" />
          </div>
          <div>
            <div className="flex flex-col">
              <label htmlFor="image">Secondary Images</label>
              <input type="file" id="image" name="image" multiple />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full">
          <div className="w-full">
            <label>Primary Image: </label>
            <Image
              src={primaryImage}
              alt="Primary Image"
              key="primaryImage"
              width={144}
              height={144}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Secondary Images: </label>
            <div className="w-full h-full max-w-[400px] overflow-x-scroll overflow-y-hidden">
              <div className="flex flex-row gap-2 h-full">
                {images.map((image, index) => {
                  return (
                    <ImageEditor
                      image={image}
                      key={index}
                      productId={productId}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <button className="dashboard-bg bg-cover py-3 uppercase" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
