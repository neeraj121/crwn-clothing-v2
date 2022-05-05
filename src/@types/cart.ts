import { Product } from "../store/categories/categories.types";

export type CartItemType = Product & { quantity: number };

export type CartState = {
    isCartOpen: boolean;
    cartItems: CartItemType[];
    cartCount: number;
    cartTotal: number;
};

export type CartContextType = CartState & {
    setIsCartOpen: (isCartOpen: boolean) => void;
    addItemToCart: (product: Product) => void;
    removeItemFromCart: (product: Product) => void;
    clearItemFromCart: (cartItem: CartItemType) => void;
};
