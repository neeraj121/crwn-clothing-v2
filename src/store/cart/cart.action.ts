import {
    ActionWithPayload,
    createAction,
    withMatcher,
} from "../../utils/reducer/reducer.utils";
import { Product } from "../categories/categories.types";
import { CartItemType, CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems: CartItemType[], product: Product) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === product.id
    );
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === existingCartItem.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return cartItems.concat({ ...product, quantity: 1 });
};

const removeCartItem = (cartItems: CartItemType[], product: Product) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === product.id
    );

    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter(
            (cartItem) => cartItem.id !== existingCartItem.id
        );
    }

    return cartItems.map((cartItem) =>
        cartItem.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const clearCartItem = (
    cartItems: CartItemType[],
    cartItemToRemove: CartItemType
) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

////////////////////////////////////////////////////////////////////////

export type SetIsCartOpen = ActionWithPayload<
    CART_ACTION_TYPES.SET_CART_OPEN,
    boolean
>;

export type SetCartItems = ActionWithPayload<
    CART_ACTION_TYPES.SET_CART_ITEMS,
    CartItemType[]
>;

export const setIsCartOpen = withMatcher(
    (isCartOpen: boolean): SetIsCartOpen =>
        createAction(CART_ACTION_TYPES.SET_CART_OPEN, isCartOpen)
);

export const setCartItems = withMatcher(
    (newCartItems: CartItemType[]): SetCartItems =>
        createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
);

export const addItemToCart = (cartItems: CartItemType[], product: Product) => {
    const newCartItems = addCartItem(cartItems, product);
    return setCartItems(newCartItems);
};

export const removeItemFromCart = (
    cartItems: CartItemType[],
    product: Product
) => {
    const newCartItems = removeCartItem(cartItems, product);
    return setCartItems(newCartItems);
};

export const clearItemFromCart = (
    cartItems: CartItemType[],
    cartItem: CartItemType
) => {
    const newCartItems = clearCartItem(cartItems, cartItem);
    return setCartItems(newCartItems);
};
