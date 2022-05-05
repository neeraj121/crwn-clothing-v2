import { Reducer, AnyAction } from "redux";
import { UserState, USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
};

export const userReducer: Reducer<UserState, AnyAction> = (
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