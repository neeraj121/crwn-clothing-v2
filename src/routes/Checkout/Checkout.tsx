import React from "react";
import { useSelector } from "react-redux";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import {
    selectCartItems,
    selectCartTotal,
} from "../../store/cart/cart.selector";
import {
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Total,
} from "./Checkout.styles";

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((cartItem) => {
                return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
            })}
            <Total>Total: {cartTotal}</Total>
        </CheckoutContainer>
    );
};

export default Checkout;
