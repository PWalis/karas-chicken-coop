import React from "react"
import Link from "next/link"

export const AddToCardButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button onClick={onClick} className="px-2 py-2 bg-floc-gray/10 hover:bg-floc-yellow transition-all ease-in-out ">Add To Cart</button>
    )
}

export const FilterButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <button className=" max-w-full rounded-full max-h-6">{children}</button>
    )
}

export const CartButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button onClick={onClick} className="w-full h-full sm:block pr-5 pl-5 pt-3 pb-3 bg-floc-yellow uppercase"><Link className="w-full h-full" key="checkout" href="/checkout">Cart</Link></button>
    )
}