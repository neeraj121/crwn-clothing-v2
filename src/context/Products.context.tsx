import React, { createContext, useEffect, useState } from "react";
import { Product, ProductsContextType } from "../@types/product";
import PRODUCTS from "../shop-data.json";

export const ProductsContext = createContext<ProductsContextType>({
    products: [],
});

export const ProductsProvider: React.FC = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const value = { products };

    useEffect(() => {
        setProducts(PRODUCTS);
    }, []);

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};
