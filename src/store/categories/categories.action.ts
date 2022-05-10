import { Dispatch } from "redux";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { CATEGORIES_ACTION_TYPES, FirestoreCategory } from "./categories.types";

export const setCategories = (categories: FirestoreCategory[]) => ({
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    payload: categories,
});

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

export const fetchCategoriesAsync = () => async (dispatch: Dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const categories = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categories));
    } catch (error) {
        dispatch(fetchCategoriesError(error as string));
    }
};
