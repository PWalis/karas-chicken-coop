import React from "react";
import { createProduct, fetchCategories } from "@/app/lib/actions";

interface CreateProps {
    categories: any;
}

export const CreateProductForm: React.FC<CreateProps> = ({ categories }) => {
  const options = categories.map((category: any) => {
    return <option value={category.name}>{category.name}</option>;
  });

  return (
    <div className="flex justify-center w-full">
      <form
        action={createProduct}
        className="flex flex-col gap-3 w-[40%] pt-24"
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" required />
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" required />
        <label htmlFor="category">Category</label>
        <select id="category" name="category" defaultValue={""}>
          <option value={""} disabled hidden>
            Select an option
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
              defaultValue={0}
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
              defaultValue={0}
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
              defaultValue={0}
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
              defaultValue={0}
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
              defaultValue={0}
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
              defaultValue={0}
            />
          </li>
        </ul>
        <label htmlFor="image">Image</label>
        <input type="file" id="image" name="image" multiple required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
