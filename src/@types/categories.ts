import { Product } from "./product";

export type FirestoreCategory = {
    title: string;
    items: Product[];
};

export type CategoriesMap = {
    [title: string]: Product[];
};

export type CategoriesMapContextType = {
    categoriesMap: CategoriesMap;
};

export type Category = {
    id: number;
    title: string;
    imageUrl: string;
};
