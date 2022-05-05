import { AnyAction, Reducer } from "redux";
import { CategoriesState, CATEGORIES_ACTION_TYPES } from "./categories.types";

const INITIAL_STATE = {
    categoriesMap: {},
};

export const categoriesReducer: Reducer<CategoriesState, AnyAction> = (
    state = INITIAL_STATE,
    action
) => {
    const { type, payload } = action;
    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
            return {
                ...state,
                categoriesMap: payload,
            };
        default:
            return state;
    }
};
