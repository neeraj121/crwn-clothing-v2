import { createContext, useState } from "react";
import { CartContextType } from "../@types/cart";

export const CartContext = createContext<CartContextType>({
    isCartOpen: false,
    setIsCartOpen: () => {},
});

export const CartProvider: React.FC = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const value = {
        isCartOpen,
        setIsCartOpen,
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
