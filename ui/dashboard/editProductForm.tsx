"use client";

import React from "react";
import Image from "next/image";
import { ImageEditor } from "./imageEditor";
import { updateProduct } from "@/app/lib/actions";
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
    <form
      action={updateProductWithProductId}
      className="flex flex-col gap-3 w-[40%] pt-24"
    >
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" required defaultValue={name} />
      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        name="price"
        required
        defaultValue={Number(price) / 100}
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        required
        defaultValue={description}
      />
      <label htmlFor="category">Category</label>
      <select
        id="category"
        name="category"
        defaultValue={category ? category : ""}
      >
        <option value={category ? category : ""} hidden>
          {category ? category : "Select an option"}
        </option>
        {options}
      </select>
      <label htmlFor="newCategory"> New Category</label>
      <input type="text" name="newCategory" id="newCategory" />
      <ul className="flex flex-row gap-8">
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
      </ul>
      <div className="flex flex-row">
        <div>
          <label htmlFor="primaryImage">Primary Image</label>
          <input type="file" id="primaryImage" name="primaryImage" />
        </div>
        <div>
          <label htmlFor="image">Add Image</label>
          <input type="file" id="image" name="image" multiple />
        </div>
      </div>
      <div className="flex flex-row gap-10">
        <div className="w-36">
          <label>Primary Image</label>
          <Image
            src={primaryImage}
            alt="Primary Image"
            key="primaryImage"
            width={144}
            height={144}
          />
        </div>
        <div className="">
          <label>Images</label>
          <div className="flex flex-row gap-2">
            {images.map((image, index) => {
              return (
                <ImageEditor image={image} key={index} productId={productId} />
              );
            })}
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
