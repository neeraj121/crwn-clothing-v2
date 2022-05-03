import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/Cart.context";
import Button from "../Button/Button";
import CartItem from "../CartItem/CartItem";
import { CartDropdownContainer, CartItems, EmptyMessage } from "./CartDropdown.styles";

interface CartDropdownProps {}

const CartDropdown: React.FC<CartDropdownProps> = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate("/checkout");
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    )) : <EmptyMessage>Your cart is empty</EmptyMessage>
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
