import { CATEGORIES_ACTION_TYPES, FirestoreCategory } from "./categories.types";

export const setCategories = (categories: FirestoreCategory[]) => ({
    type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
    payload: categories,
});
