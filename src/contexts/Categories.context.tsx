import React, { createContext, useEffect, useState } from "react";
import {
    CategoriesState,
    FirestoreCategory,
} from "../store/categories/categories.types";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext<CategoriesState>({
    categories: [],
});

export const CategoriesProvider: React.FC = ({ children }) => {
    const [categories, setCategories] = useState<FirestoreCategory[]>([]);
    const value = { categories };

    useEffect(() => {
        const getCategories = async () => {
            const categories = await getCategoriesAndDocuments();
            setCategories(categories);
        };
        getCategories();
    }, []);

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};
