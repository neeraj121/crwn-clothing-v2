import React from "react";
import Button from "../CustomButton/Button";
import "./CartDropdown.scss";

interface CartDropdownProps {}

const CartDropdown: React.FC<CartDropdownProps> = () => {
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items"></div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;
