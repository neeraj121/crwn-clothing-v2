import React, { useContext } from "react";
import { CartItemType } from "../../@types/cart";
import { CartContext } from "../../contexts/Cart.context";
import { Arrow, BaseSpan, CheckoutItemContainer, ImageContainer, Quantity, RemoveButton, Value } from "./CheckoutItem.styles";

interface CheckoutItemProps {
    cartItem: CartItemType;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({ cartItem }) => {
    const { name, quantity, price, imageUrl } = cartItem;
    const { addItemToCart, removeItemFromCart, clearItemFromCart } =
        useContext(CartContext);

    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);
    const clearItemHandler = () => clearItemFromCart(cartItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={removeItemHandler}>
                    &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;
