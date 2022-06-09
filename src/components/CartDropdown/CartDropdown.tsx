import React, { useCallback, useMemo } from "react";
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

const sleep = (milliseconds: number): void => {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > milliseconds) {
            break;
        }
    }
};

const CartDropdown: React.FC<CartDropdownProps> = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const [count, setCount] = useState(0);

    const goToCheckoutHandler = useCallback(() => {
        navigate("/checkout");
    }, []);

    const hundredCount = useMemo(() => {
        console.log("start");
        sleep(2000);
        console.log("end");
        return count + 100;
    }, [count]);

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
};

export default CartDropdown;
