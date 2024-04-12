import React from 'react';
import { ItemCard } from './itemCard';

export const Products: React.FC = () => {
    return (
        <div className="flex justify-center 2xl:justify-between flex-wrap gap-10 max-w-5xl sm:pt-5">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
        </div>
    );
};