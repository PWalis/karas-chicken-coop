import React from "react";
import { FilterButton } from "./buttons";

export const ProductFilter: React.FC = () => {
    return (
        <div className="block max-w-xs justify-center">
            <h3 className=" text-center">Product Categories</h3>
            <ul className="max-h-6 sm:max-h-full sm:block overflow-auto text-nowrap">
                <li className="sm:block inline-block">
                    <FilterButton>Tee Shirts</FilterButton>
                </li>
                <li className="sm:block inline-block">
                    <FilterButton>Button 2</FilterButton>
                </li>
                <li className="sm:block inline-block">
                    <FilterButton>Button 3</FilterButton>
                </li>
                <li className="sm:block inline-block">
                    <FilterButton>Button 4</FilterButton>
                </li>
                <li className="sm:block inline-block">
                    <FilterButton>Button 5</FilterButton>
                </li>
                <li className="sm:block inline-block">
                    <FilterButton>Button 6</FilterButton>
                </li>
                <li className="sm:block inline-block">
                    <FilterButton>Button 7</FilterButton>
                </li>
                <li className="sm:block inline-block">
                    <FilterButton>Button 8</FilterButton>
                </li>
                <li className="sm:block inline-block">
                    <FilterButton>Button 9</FilterButton>
                </li>
            </ul>
        </div>
    );
};
