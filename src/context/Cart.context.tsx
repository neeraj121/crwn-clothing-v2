import { createContext, useEffect, useState } from "react";
import { CartContextType, CartItemType } from "../@types/cart";
import { Product } from "../@types/product";

const addCartItem = (cartItems: CartItemType[], productToAdd: Product) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === existingCartItem.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return cartItems.concat({ ...productToAdd, quantity: 1 });
};

export const CartContext = createContext<CartContextType>({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: (productToAdd) => {},
    cartCount: 0,
});

export const CartProvider: React.FC = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => (total += cartItem.quantity),
            0
        );
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd: Product) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartCount,
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
