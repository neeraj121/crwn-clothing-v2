import { createSelector } from "reselect";
import { RootState } from "../store";
import { CategoriesMap } from "./categories.types";

const selectCategoryReducer = (state: RootState) => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) =>
        categories.reduce((acc: CategoriesMap, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
);
