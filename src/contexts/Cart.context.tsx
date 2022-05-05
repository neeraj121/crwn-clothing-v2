import { createContext, Reducer, useReducer } from "react";
import { CartContextType, CartItemType, CartState } from "../@types/cart";
import { Product } from "../store/categories/categories.types";

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

export enum CART_ACTION_TYPES {
    SET_CART_ITEMS = "SET_CART_ITEMS",
    SET_CART_COUNT = "SET_CART_COUNT",
    SET_CART_TOTAL = "SET_CART_TOTAL",
    SET_CART_OPEN = "SET_CART_OPEN",
}

type CartAction =
    | {
          type: CART_ACTION_TYPES.SET_CART_ITEMS;
          payload: {
              cartItems: CartItemType[];
              cartTotal: number;
              cartCount: number;
          };
      }
    | { type: CART_ACTION_TYPES.SET_CART_OPEN; payload: boolean };

const INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

const cartReducer: Reducer<CartState, CartAction> = (
    state = INITIAL_STATE,
    action
) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            return state;
    }
};

export const CartContext = createContext<CartContextType>({
    ...INITIAL_STATE,
    setIsCartOpen: () => {},
    addItemToCart: (product) => {},
    removeItemFromCart: (product) => {},
    clearItemFromCart: (cartItem) => {},
});

export const CartProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { cartItems } = state;

    const setIsCartOpen = (isCartOpen: boolean) => {
        dispatch({
            type: CART_ACTION_TYPES.SET_CART_OPEN,
            payload: isCartOpen,
        });
    };

    const updateCartItemsReducer = (newCartItems: CartItemType[]) => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => (total += cartItem.quantity),
            0
        );

        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => (total += cartItem.quantity * cartItem.price),
            0
        );

        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS,
            payload: {
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal,
            },
        });
    };

    const addItemToCart = (product: Product) => {
        const newCartItems = addCartItem(cartItems, product);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (product: Product) => {
        const newCartItems = removeCartItem(cartItems, product);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItem: CartItemType) => {
        const newCartItems = clearCartItem(cartItems, cartItem);
        updateCartItemsReducer(newCartItems);
    };

    const value = {
        ...state,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
