import React, { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/Cart.context";
import "./CartIcon.styles.scss";

interface CartIconProps {}

const CartIcon: React.FC<CartIconProps> = () => {
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);
    return (
        <div
            className="cart-icon-container"
            onClick={() => setIsCartOpen(!isCartOpen)}
        >
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">0</span>
        </div>
    );
};

export default CartIcon;
