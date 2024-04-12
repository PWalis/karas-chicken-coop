import React from "react"

export const AddToCardButton:React.FC = () => {
    return (
        <button>Add To Card</button>
    )
}

export const FilterButton:React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <button className="border border-black max-w-full rounded-full px-2 max-h-6">{children}</button>
    )
}