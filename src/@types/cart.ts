import { Product } from "./product";

export type CartItemType = Product & { quantity: number };

export type CartContextType = {
    isCartOpen: boolean;
    setIsCartOpen: (isCartOpen: boolean) => void;
    cartItems: CartItemType[];
    addItemToCart: (product: Product) => void;
    removeItemFromCart: (product: Product) => void;
    clearItemFromCart: (cartItem: CartItemType) => void;
    cartCount: number;
    cartTotal: number;
};
