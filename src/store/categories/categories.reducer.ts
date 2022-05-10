import { AnyAction, Reducer } from "redux";
import { CategoriesState, CATEGORIES_ACTION_TYPES } from "./categories.types";

const INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
};

export const categoriesReducer: Reducer<CategoriesState, AnyAction> = (
    state = INITIAL_STATE,
    action
) => {
    const { type, payload } = action;
    switch (type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true,
            };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: payload,
            };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL:
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};
