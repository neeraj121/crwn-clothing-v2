import { RootState } from "../store";

export const selectCategoryMap = (state: RootState) =>
    state.categories.categoriesMap;
