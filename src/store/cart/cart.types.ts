import { Product } from "../categories/categories.types";

export type CartItemType = Product & { quantity: number };

export type CartState = {
    isCartOpen: boolean;
    cartItems: CartItemType[];
};

export enum CART_ACTION_TYPES {
    SET_CART_ITEMS = "SET_CART_ITEMS",
    SET_CART_COUNT = "SET_CART_COUNT",
    SET_CART_TOTAL = "SET_CART_TOTAL",
    SET_CART_OPEN = "SET_CART_OPEN",
}
