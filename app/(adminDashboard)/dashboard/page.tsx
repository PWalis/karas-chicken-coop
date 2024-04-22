import React from "react";

export default function DashBoard() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex mt-28 text-center justify-center">
        <h1 className="text-4xl my-auto mb-10 text-center uppercase">Welcome Kara!</h1>
      </div>
      <div className="flex flex-wrap gap-14 justify-center">
        <div className="drop-shadow-md bg-white h-full border rounded-md px-10 py-4">
          <div className="max-w-[600px]">
            <div className="flex gap-28">
            <h2 className="text-lg uppercase">Patrick Wilky's Order!</h2>{" "}
            <p> 4/22/2024 </p>
            </div>
            <p>404 this St 82502, Phonenix Az</p>
            <div className="flex justify-between">
            <p>2xl shirts</p>
            <p> checkmark </p>
            </div>
          </div>
        </div>
        <div className="w-[45%] h-fullv border-2 p-10">
          <p>Product list content goes here</p>
        </div>
      </div>
    </div>
  );
}
