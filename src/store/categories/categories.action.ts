import {
    Action,
    ActionWithPayload,
    createAction,
} from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES, FirestoreCategory } from "./categories.types";

export type FetchCategoriesStart =
    Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    FirestoreCategory[]
>;

export type FetchCategoriesError = ActionWithPayload<
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL,
    Error
>;

export type CategoryAction =
    | FetchCategoriesStart
    | FetchCategoriesSuccess
    | FetchCategoriesError;

export const fetchCategoriesStart = (): FetchCategoriesStart =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (
    categories: FirestoreCategory[]
): FetchCategoriesSuccess =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesError = (error: Error): FetchCategoriesError =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error);
