"use client";
import { createProduct } from "@/app/lib/actions";
import { CheckMark } from "./sizingButton";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface CreateProps {
  categories: any;
}

export const CreateProductForm: React.FC<CreateProps> = ({ categories }) => {
  const [showOptions, setShowOptions] = useState(false);
  const initialState = { message: "", errors: {}, size: null };
  const [state, formAction] = useFormState(createProduct, initialState);

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
        action={formAction}
        className="flex flex-col gap-2 min-w-[346px] w-fit justify-center drop-shadow-md bg-white h-fill border rounded-md p-3 mb-4"
      >
        <div className="flex flex-col sm:flex-row sm:gap-3">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
            {state.error?.name &&
              state.error.name.map((error: string) => (
                <p className="text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div className="flex flex-col">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" />
            <div className="flex flex-row gap-2">
              {state.error?.price &&
                state.error.price.map((error: string) => (
                  <p className="text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" />
        {state.error?.description &&
          state.error.description.map((error: string) => (
            <p className="text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        <div className="flex flex-col sm:flex-row sm:gap-3 w-fill justify-between">
          <div className="flex flex-col">
            <label className="rounded-none" htmlFor="category">
              Category
            </label>
            <select
              className="w-fill h-[42px]"
              id="category"
              name="category"
              defaultValue={""}
            >
              <option value={""} disabled hidden>
                Select a Category
              </option>
              {options}
            </select>
          </div>
          <div className="flex flex-col w-fill">
            <label htmlFor="newCategory"> New Category</label>
            <input type="text" name="newCategory" id="newCategory" />
          </div>
        </div>
        {state.error?.newCategory &&
          state.error.newCategory.map((error: string) => (
            <p className="text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        <div className="flex-row justify-center place-items-center">
          <div className="place-items-center flex">
            <label htmlFor="SizeOptions">Size Options?</label>
            <button onClick={toggleOptions}>
              <CheckMark />
            </button>
            <div hidden>
              <input type="radio" name="size" checked={showOptions} />
            </div>
          </div>
          {showOptions ? (
            <ul className="flex flex-wrap gap-4 justify-center">
              <li className="flex flex-col">
                <label htmlFor="xs">XS</label>
                <input
                  className="max-w-10 h-10 p-1"
                  type="number"
                  id="xs"
                  name="xs"
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
                    defaultValue={0}
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
                defaultValue={0}
              />
              {state.error?.quantity &&
                state.error.quantity.map((error: string) => (
                  <p className="text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="primaryImage">Primary Image</label>
          <input
            className=""
            type="file"
            id="primaryImage"
            name="primaryImage"
          />
          {state.error?.primaryImage &&
            state.error.primaryImage.map((error: string) => (
              <p className="text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <label htmlFor="image">Choose Images</label>
        <input type="file" id="image" name="image" multiple />
        {state.error?.image &&
          state.error.image.map((error: string) => (
            <p className="text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        <div className="flex justify-center">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-cover dashboard-bg hover:bg-cyan-400 w-full px-10 py-3 justify-center uppercase"
      type="submit"
    >
      {pending ? "Creating Product..." : "Submit"}
    </button>
  );
}
