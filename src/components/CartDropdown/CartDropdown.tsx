import React, { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button from "../Button/Button";
import CartItem from "../CartItem/CartItem";
import {
    CartDropdownContainer,
    CartItems,
    EmptyMessage,
} from "./CartDropdown.styles";

interface CartDropdownProps {}

const CartDropdown: React.FC<CartDropdownProps> = memo(() => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = useCallback(() => {
        navigate("/checkout");
    }, [navigate]);

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
});

export default CartDropdown;
