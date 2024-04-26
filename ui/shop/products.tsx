import React from 'react';
import { ItemCard } from './itemCard';
import { fetchAllProducts } from '@/app/lib/actions';
import { formatCurrency } from '@/app/lib/utils';

export const Products: React.FC = async() => {
    const products = (await fetchAllProducts()) as any;
    

    const productsList = products.map((product: any) => {
        return (
            <ItemCard
                productId={product.id}
                name={product.name}
                price={formatCurrency(product.priceInCents)}
                description={product.description}
                images={product.images}
                category={product.category.name}
                inventory={product.inventory}
                key={product.id}
                stripePriceKey={product.stripePriceKey}
            />
        );
    });
    return (
        <div className="flex justify-center 2xl:justify-between flex-wrap gap-10 max-w-5xl sm:pt-5">
            {productsList}
        </div>
    );
};