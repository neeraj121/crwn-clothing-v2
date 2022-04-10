import React, { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import CartItem from "../CartItem/CartItem";
import Button from "../CustomButton/Button";
import "./CartDropdown.scss";

interface CartDropdownProps {}

const CartDropdown: React.FC<CartDropdownProps> = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;
