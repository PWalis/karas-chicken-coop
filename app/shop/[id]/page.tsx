// page to display one product and all the product pictures and details of the product

import Image from "next/image";

export default function ProductPage() {
  return (
    <main className="mt-28 flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="">
          <Image src="https://via.placeholder.com/600" alt="item" />
        </div>
        <div className="">
          <h1>Item Name</h1>
          <p>Item Description</p>
          <p>Price</p>
          <button>Add To Card</button>
        </div>
      </div>
    </main>
  );
}
