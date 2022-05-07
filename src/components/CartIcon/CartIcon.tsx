import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
import {
    selectCartCount,
    selectIsCartOpen,
} from "../../store/cart/cart.selector";
import {
    CartIconContainer,
    ItemCount,
    ShoppingIconStyled,
} from "./CartIcon.styles";

interface CartIconProps {}

const CartIcon: React.FC<CartIconProps> = () => {
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);
    const dispatch = useDispatch();
    const toggleCartDropdown = () => dispatch(setIsCartOpen(!isCartOpen));
    return (
        <CartIconContainer onClick={toggleCartDropdown}>
            <ShoppingIconStyled className="shopping-icon" />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
