"use client";

import { createContext, useContext, useReducer } from "react";

interface CartItem {
  name: string;
  price: string;
  description: string;
  images: string[];
  category: string;
  inventory: number;
  productId: number;
  stripePriceKey: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; payload: number };

const CartStateContext = createContext<CartState | undefined>(undefined);

const CartDispatchContext = createContext<
  React.Dispatch<CartAction> | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case "ADD":
      return { items: [...state.items, action.payload] };
    case "REMOVE":
      return {
        items: state.items.filter((item) => item.productId !== action.payload),
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const useCartDispatch = () => {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error("useCartDispatch must be used within a CartProvider");
  }
  return context;
};
