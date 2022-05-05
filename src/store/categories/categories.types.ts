export enum CATEGORIES_ACTION_TYPES {
    SET_CATEGORIES_MAP = "SET_CATEGORIES_MAP",
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
    categoriesMap: CategoriesMap;
};
