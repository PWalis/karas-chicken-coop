import React from "react";

export const Categories: React.FC = () => {
  return (
    <select id="category" name="category" required>
      <option value="Tee Shirts">Tee Shirts</option>
      <option value="Stickers">Stickers</option>
      <option value="Headwear">Headwear</option>
    </select>
  );
};
