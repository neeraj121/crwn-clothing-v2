import { AnyAction, Reducer } from "redux";
import { CategoriesState, CATEGORIES_ACTION_TYPES } from "./categories.types";

const INITIAL_STATE = {
    categories: [],
};

export const categoriesReducer: Reducer<CategoriesState, AnyAction> = (
    state = INITIAL_STATE,
    action
) => {
    const { type, payload } = action;
    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
            return {
                ...state,
                categories: payload,
            };
        default:
            return state;
    }
};
