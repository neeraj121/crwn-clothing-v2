import { Reducer } from "redux";
import { CategoryAction } from "./categories.action";
import { CATEGORIES_ACTION_TYPES, FirestoreCategory } from "./categories.types";

export type CategoriesState = {
    readonly categories: FirestoreCategory[];
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
};

export const categoriesReducer: Reducer<CategoriesState, CategoryAction> = (
    state = CATEGORIES_INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true,
            };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: action.payload,
            };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
