import React from "react";
import { CartItemType } from "../../@types/cart";
import { CartItemContainer, ItemDetails } from "./CartItem.styles";

interface CartItemProps {
    cartItem: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
    const { name, price, quantity, imageUrl } = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <span>{name}</span>
                <span>{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;
