import React from "react"

export const ItemCard = () => {
    return (
        <div className="item-card">
            <img src="https://via.placeholder.com/300" alt="item" />
            <h3>Item Name</h3>
            <p>Item Description</p>
            <p>Price</p>
            <button>Add To Card</button>
        </div>
    )
}
