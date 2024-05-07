"use client";

import { createContext, useContext, useReducer } from "react";

interface CartItem {
  name: string;
  priceInCents: number;
  description: string;
  images: string[];
  primaryImage: string;
  category: string;
  inventory: any;
  id: number;
  stripePriceKey: string;
  quantity: number;
  itemId: string;
  size: string;
}

interface CartState {
  items: CartItem[];
  paymentIntentId: string;
}

type CartAction =
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; payload: string }
  | { type: "SET_PAYMENT_INTENT_ID"; payload: string }
  | { type: "SET_QUANTITY"; payload: { itemId: string, quantity: number } };

const CartStateContext = createContext<CartState | undefined>(undefined);

const CartDispatchContext = createContext<
  React.Dispatch<CartAction> | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case "ADD":
      const uuid = Math.random().toString(36).substring(7);
      // update the quantity of the item if it already exists in the cart
      if (action.payload.inventory.hasSizes) {
        const existingItem = state.items.find(
          (item) =>
            item.id === action.payload.id &&
            item.size === action.payload.size
        );
        if (existingItem) {
          return {
            ...state,
            items: state.items.map((item) =>
              item.itemId === existingItem.itemId
                ? { ...item, quantity: item.quantity + action.payload.quantity }
                : item
            ),
          }
        } else {
          action.payload.itemId = uuid;
          return {...state, items: [...state.items, action.payload] };
        }
      } else {
        const existingItem = state.items.find(
          (item) => item.id === action.payload.id
        );
        if (existingItem) {
          return {
            ...state,
            items: state.items.map((item) =>
              item.itemId === existingItem.itemId
                ? { ...item, quantity: item.quantity + action.payload.quantity }
                : item
            ),
          }
        } else {
          action.payload.itemId = uuid;
          return {...state, items: [...state.items, action.payload] };
        }
      }
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((item) => item.itemId !== action.payload),
      };
    case "SET_PAYMENT_INTENT_ID":
      return {
        ...state,
        paymentIntentId: action.payload,
      };
    case "SET_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.itemId === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], paymentIntentId: "" } as CartState);

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
