import React from "react";
import "./Shop.styles.scss";
import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../CategoriesPreview/CategoriesPreview";
import Category from "../Category/Category";

interface ShopProps {}

const Shop: React.FC<ShopProps> = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path="/:category" element={<Category />} />
        </Routes>
    );
};

export default Shop;
