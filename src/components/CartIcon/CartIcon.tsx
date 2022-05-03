import React, { useContext } from "react";
import { CartContext } from "../../contexts/Cart.context";
import { CartIconContainer, ItemCount, ShoppingIconStyled } from "./CartIcon.styles";

interface CartIconProps {}

const CartIcon: React.FC<CartIconProps> = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const toggleCartDropdown = () => setIsCartOpen(!isCartOpen);
    return (
        <CartIconContainer onClick={toggleCartDropdown}>
            <ShoppingIconStyled className="shopping-icon" />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
