import React from "react";

export default function DashBoard() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-start h-[10%]">
        <h1 className="text-4xl my-auto">Welcome Kara!</h1>
      </div>
      <div className="flex gap-14">
        <div className="w-[45%] h-full border border-blue-600"><p>Orders content goes here</p></div>
        <div className="w-[45%] h-full border border-blue-600"><p>Product list content goes here</p></div>
      </div>
    </div>
  );
}
