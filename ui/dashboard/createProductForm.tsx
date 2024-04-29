"use client";
import { createProduct } from "@/app/lib/actions";
import { CheckMark } from "./checkmark";
import React, { useState } from "react";

interface CreateProps {
  categories: any;
}

export const CreateProductForm: React.FC<CreateProps> = ({ categories }) => {
  const [showOptions, setShowOptions] = useState(false);
  const createProductWithSize = createProduct.bind(null, { size: showOptions });

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
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
        action={createProductWithSize}
        className="flex flex-col gap-2 min-w-[346px] w-fit justify-center drop-shadow-md bg-white h-fill border rounded-md p-3"
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" required />
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" required />
        <label className="rounded-none" htmlFor="category">
          Category
        </label>
        <select
          className=""
          id="category"
          name="category"
          defaultValue={""}
        >
          <option value={""} disabled hidden>
            Select a Category
          </option>
          {options}
        </select>
        <label htmlFor="newCategory"> New Category</label>
        <input type="text" name="newCategory" id="newCategory" />
        <div className="flex-row justify-center place-items-center">
          <div className="place-items-center flex">
            <label htmlFor="SizeOptions">Size Options?</label>
            <button onClick={toggleOptions}>
              <CheckMark />
            </button>
          </div>
          {showOptions && (
            <ul className="flex  flex-wrap gap-4 justify-center">
              <li className="flex flex-col">
                <label htmlFor="xs">XS</label>
                <input
                  className="max-w-10 h-10 p-1"
                  type="number"
                  id="xs"
                  name="xs"
                  required
                  defaultValue={0}
                />
              </li>
              <li className="flex flex-col">
                <label htmlFor="small">S</label>
                <input
                  className="max-w-10 h-10 p-1"
                  type="number"
                  id="small"
                  name="small"
                  required
                  defaultValue={0}
                />
              </li>
              <li className="flex flex-col">
                <label htmlFor="medium">M</label>
                <input
                  className="max-w-10 h-10 p-1"
                  type="number"
                  id="medium"
                  name="medium"
                  required
                  defaultValue={0}
                />
              </li>
              <div className="flex gap-4">
                <li className="flex flex-col">
                  <label htmlFor="large">L</label>
                  <input
                    className="max-w-10 h-10 p-1"
                    type="number"
                    id="large"
                    name="large"
                    required
                    defaultValue={0}
                  />
                </li>
                <li className="flex flex-col ">
                  <label htmlFor="xl">XL</label>
                  <input
                    className="max-w-10 h-10 p-1"
                    type="number"
                    id="xl"
                    name="xl"
                    required
                    defaultValue={0}
                  />
                </li>
                <li className="flex flex-col ">
                  <label htmlFor="xxl">XXL</label>
                  <input
                    className="max-w-10 h-10 p-1"
                    type="number"
                    id="xxl"
                    name="xxl"
                    required
                    defaultValue={0}
                  />
                </li>
              </div>
            </ul>
          )}
        </div>
        <label htmlFor="primaryImage">Primary Image</label>
        <input type="file" id="primaryImage" name="primaryImage" required />
        <label htmlFor="image">Choose Images</label>
        <input type="file" id="image" name="image" multiple required />
        <div className="flex justify-center">
          <button
            className="bg-cyan-600 hover:bg-cyan-400 w-full px-10 py-3 justify-center uppercase"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
