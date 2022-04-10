import { Product } from "./product";

export type CartItemType = Product & { quantity: number };

export type CartContextType = {
    isCartOpen: boolean;
    setIsCartOpen: (isCartOpen: boolean) => void;
    cartItems: CartItemType[];
    addItemToCart: (productToAdd: Product) => void;
    cartCount: number;
};
