export enum CATEGORIES_ACTION_TYPES {
    FETCH_CATEGORIES_START = "categories/FETCH_CATEGORIES_START",
    FETCH_CATEGORIES_SUCCESS = "categories/FETCH_CATEGORIES_SUCCESS",
    FETCH_CATEGORIES_FAIL = "categories/FETCH_CATEGORIES_FAIL",
}

export type Product = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
};

export type Category = {
    id: number;
    title: string;
    imageUrl: string;
};

export type FirestoreCategory = {
    title: string;
    items: Product[];
};

export type CategoriesMap = {
    [title: string]: Product[];
};

export type CategoriesState = {
    categories: FirestoreCategory[];
    isLoading: boolean;
    error?: null | string;
};
