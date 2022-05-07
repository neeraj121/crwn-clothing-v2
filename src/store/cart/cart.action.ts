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
    if (existingCartItem) {
        if (existingCartItem.quantity === 1) {
            return cartItems.filter(
                (cartItem) => cartItem.id !== existingCartItem.id
            );
        } else {
            return cartItems.map((cartItem) =>
                cartItem.id === existingCartItem.id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            );
        }
    }

    return cartItems;
};

const clearCartItem = (
    cartItems: CartItemType[],
    cartItemToRemove: CartItemType
) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

////////////////////////////////////////////////////////////////////////

export const setIsCartOpen = (isCartOpen: boolean) => ({
    type: CART_ACTION_TYPES.SET_CART_OPEN,
    payload: isCartOpen,
});

const updateCartItemsReducer = (newCartItems: CartItemType[]) => {
    return {
        type: CART_ACTION_TYPES.SET_CART_ITEMS,
        payload: newCartItems,
    };
};

export const addItemToCart = (cartItems: CartItemType[], product: Product) => {
    const newCartItems = addCartItem(cartItems, product);
    return updateCartItemsReducer(newCartItems);
};

export const removeItemFromCart = (
    cartItems: CartItemType[],
    product: Product
) => {
    const newCartItems = removeCartItem(cartItems, product);
    return updateCartItemsReducer(newCartItems);
};

export const clearItemFromCart = (
    cartItems: CartItemType[],
    cartItem: CartItemType
) => {
    const newCartItems = clearCartItem(cartItems, cartItem);
    return updateCartItemsReducer(newCartItems);
};
