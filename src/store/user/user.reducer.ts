import { Reducer, AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import {
    emailSignInStart,
    googleSignInStart,
    signInFailed,
    signInSuccess,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
    signUpStart,
} from "./user.action";

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: null | string;
};

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
};

export const userReducer: Reducer<UserState, AnyAction> = (
    state = INITIAL_STATE,
    action
) => {
    const { type, payload } = action;

    if (
        emailSignInStart.match(type) ||
        googleSignInStart.match(type) ||
        signUpStart.match(type)
    ) {
        return {
            ...state,
            isLoading: true,
        };
    }

    if (signInSuccess.match(type)) {
        return {
            ...state,
            isLoading: false,
            currentUser: payload,
        };
    }

    if (signOutSuccess.match(type)) {
        return {
            ...state,
            isLoading: false,
            currentUser: null,
        };
    }

    if (
        signInFailed.match(type) ||
        signUpFailed.match(type) ||
        signOutFailed.match(type)
    ) {
        return {
            ...state,
            isLoading: false,
            error: payload,
        };
    }

    return state;
};
