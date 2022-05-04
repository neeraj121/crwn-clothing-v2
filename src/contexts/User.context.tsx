import React, { createContext, useEffect, useReducer, Reducer } from "react";
import { MyUser, UserState } from "../@types/user";
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

//as the actual value you want to access
export const UserContext = createContext<UserState>({
    currentUser: null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
};

type UserAction = { type: string, payload: MyUser }; 

const userReducer: Reducer<UserState, UserAction> = (state, action) => {
    const { type, payload } = action;
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER: 
            return {
                ...state,
                currentUser: payload
            };
        default:
            return state;
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider: React.FC = ({ children }) => {
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const setCurrentUser = (user: MyUser) => {
        dispatch({
            type: USER_ACTION_TYPES.SET_CURRENT_USER,
            payload: user
        })
    }
    const value = { currentUser };

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
