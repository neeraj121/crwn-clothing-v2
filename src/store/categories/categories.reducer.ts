import { AnyAction, Reducer } from "redux";
import {
    fetchCategoriesError,
    fetchCategoriesStart,
    fetchCategoriesSuccess,
} from "./categories.action";
import { FirestoreCategory } from "./categories.types";

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

export const categoriesReducer: Reducer<CategoriesState, AnyAction> = (
    state = CATEGORIES_INITIAL_STATE,
    action
) => {
    if (fetchCategoriesStart.match(action)) {
        return {
            ...state,
            isLoading: true,
        };
    }

    if (fetchCategoriesSuccess.match(action)) {
        return {
            ...state,
            isLoading: false,
            categories: action.payload,
        };
    }

    if (fetchCategoriesError.match(action)) {
        return {
            ...state,
            isLoading: false,
            error: action.payload,
        };
    }

    return state;
};
