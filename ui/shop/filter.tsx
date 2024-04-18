import React from "react";
import { FilterButton } from "./buttons";

export const ProductFilter: React.FC = () => {
    return (
        <div className="justify-center text-center flex-row">
            <ul className="max-h-6 sm:max-h-full flex justify-center overflow-auto text-nowrap pt-2 gap-3">
                <li className="sm:block inline-block">
                    <FilterButton>T-Shirts</FilterButton>
                </li>
                <li className="sm:block inline-block">
                    <FilterButton>Stickers</FilterButton>
                </li>
                <li className="sm:block inline-block">
                    <FilterButton>Button 3</FilterButton>
                </li>
            </ul>
        </div>
    );
};
