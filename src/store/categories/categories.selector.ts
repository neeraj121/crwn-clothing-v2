import { RootState } from "../store";
import { CategoriesMap } from "./categories.types";

export const selectCategoryMap = (state: RootState) => {
    const categories = state.categories.categories;
    return categories.reduce((acc: CategoriesMap, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
};
