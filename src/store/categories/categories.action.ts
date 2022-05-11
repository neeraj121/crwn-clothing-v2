import { CATEGORIES_ACTION_TYPES, FirestoreCategory } from "./categories.types";

export const fetchCategoriesStart = () => ({
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
});

export const fetchCategoriesSuccess = (categories: FirestoreCategory[]) => ({
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    payload: categories,
});

export const fetchCategoriesError = (error: string) => ({
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL,
    payload: error,
});
