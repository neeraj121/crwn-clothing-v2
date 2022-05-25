import { AnyAction, Reducer } from "redux";
import { setIsCartOpen, setCartItems } from "./cart.action";
import { CartItemType } from "./cart.types";

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItemType[];
};

const INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
};

export const cartReducer: Reducer<CartState, AnyAction> = (
    state = INITIAL_STATE,
    action
) => {
    if (setIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload,
        };
    }

    if (setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload,
        };
    }

    return state;
};
