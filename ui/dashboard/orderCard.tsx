import React from "react";
import { CheckMark } from "@/ui/dashboard/checkmark";

export const OrderCard: React.FC = () => {
  return (
    <div className="drop-shadow-sm hover:drop-shadow-md bg-white h-fill lg:min-w-[500px] border rounded-md px-10 py-4 mb-4 w-fit m-2">
        <div className="flex flex-wrap justify-between gap-3">
          <h2 className="text-lg uppercase">Patrick Wilky's Order!</h2>{" "}
          <p>purchased: 4/22/2024</p>
        </div>
        <p>404 this St 82502, Phoenix AZ</p>
        <div className="flex flex-wrap justify-between">
          <p>2xl shirts</p>
          <CheckMark></CheckMark>
        </div>
      </div>
  );
};