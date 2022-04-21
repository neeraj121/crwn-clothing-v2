import React, { createContext, useEffect, useState } from "react";
import { CategoriesMap, CategoriesMapContextType } from "../@types/categories";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext<CategoriesMapContextType>({
    categoriesMap: {},
});

export const CategoriesProvider: React.FC = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState<CategoriesMap>({});
    const value = { categoriesMap };

    useEffect(() => {
        const getCategories = async () => {
            const categoryMapResponse = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMapResponse);
        };
        getCategories();
    }, []);

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};
