import { createContext, useEffect, useState } from "react";
import { CartContextType, CartItemType } from "../@types/cart";
import { Product } from "../@types/product";

const addCartItem = (cartItems: CartItemType[], product: Product) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === product.id
    );
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === existingCartItem.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return cartItems.concat({ ...product, quantity: 1 });
};

const removeCartItem = (cartItems: CartItemType[], product: Product) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === product.id
    );
    if (existingCartItem) {
        if (existingCartItem.quantity === 1) {
            return cartItems.filter(
                (cartItem) => cartItem.id !== existingCartItem.id
            );
        } else {
            return cartItems.map((cartItem) =>
                cartItem.id === existingCartItem.id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            );
        }
    }

    return cartItems;
};

const clearCartItem = (
    cartItems: CartItemType[],
    cartItemToRemove: CartItemType
) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

export const CartContext = createContext<CartContextType>({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: (product) => {},
    removeItemFromCart: (product) => {},
    clearItemFromCart: (cartItem) => {},
    cartCount: 0,
    cartTotal: 0,
});

export const CartProvider: React.FC = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => (total += cartItem.quantity),
            0
        );

        const newCartTotal = cartItems.reduce(
            (total, cartItem) => (total += cartItem.quantity * cartItem.price),
            0
        );

        setCartCount(newCartCount);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (product: Product) => {
        setCartItems(addCartItem(cartItems, product));
    };

    const removeItemFromCart = (product: Product) => {
        setCartItems(removeCartItem(cartItems, product));
    };

    const clearItemFromCart = (cartItem: CartItemType) => {
        setCartItems(clearCartItem(cartItems, cartItem));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartCount,
        cartTotal,
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
