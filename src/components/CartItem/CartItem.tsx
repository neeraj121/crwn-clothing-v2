import React from "react";
import "./CartItem.styles.scss";
import { CartItemType } from "../../@types/cart";

interface CartItemProps {
    cartItem: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
    const { name, price, quantity, imageUrl } = cartItem;
    return (
        <div className="cart-item-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="item-details">
                <span className="name">{name}</span>
                <span className="quantity">
                    {quantity} x ${price}
                </span>
            </div>
        </div>
    );
};

export default CartItem;
