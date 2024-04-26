import React from "react";

// get items from context 
// map context list to shop items 

export const CartList: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <img src="https://via.placeholder.com/150" alt="product" />
        <div>
          <h3>Product Name</h3>
          <p>Price: $0.00</p>
          <p>Quantity: 1</p>
        </div>
      </div>
      <div className="flex gap-5">
        <img src="https://via.placeholder.com/150" alt="product" />
        <div>
          <h3>Product Name</h3>
          <p>Price: $0.00</p>
          <p>Quantity: 1</p>
        </div>
      </div>
    </div>
  );
};
