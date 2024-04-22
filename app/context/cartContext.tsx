'use client'

import { createContext, useContext, useReducer } from "react";

const CartContext = createContext([]);

const CartDispatchContext = createContext<React.Dispatch<any> | null>(null);

export function CartProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [cart, dispatch] = useReducer(cartReducer, []);

    return (
        <CartContext.Provider value={cart}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartContext.Provider>
    );
}

export function useCart() {
  return useContext(CartContext);
}

export function useCartDispatch() {
  return useContext(CartDispatchContext);
}

function cartReducer(state: any, action: any) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((item: any) => item.id !== action.payload.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}
