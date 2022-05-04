import React, { createContext, useEffect, useReducer, Reducer } from "react";
import { MyUser, UserState } from "../@types/user";
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

export enum USER_ACTION_TYPES {
    SET_CURRENT_USER = "SET_CURRENT_USER",
}

type UserAction = { type: USER_ACTION_TYPES.SET_CURRENT_USER; payload: MyUser };

const INITIAL_STATE = {
    currentUser: null,
};

const userReducer: Reducer<UserState, UserAction> = (
    state = INITIAL_STATE,
    action
) => {
    const { type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            };
        default:
            return state;
    }
};

export const UserContext = createContext<UserState>({
    ...INITIAL_STATE,
});

export const UserProvider: React.FC = ({ children }) => {
    const [userState, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const setCurrentUser = (user: MyUser) => {
        dispatch({
            type: USER_ACTION_TYPES.SET_CURRENT_USER,
            payload: user,
        });
    };
    const value = userState;

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
