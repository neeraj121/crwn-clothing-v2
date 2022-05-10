import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fetchCategoriesAsync } from "../../store/categories/categories.action";
import { AppDispatch } from "../../store/store";
import CategoriesPreview from "../CategoriesPreview/CategoriesPreview";
import Category from "../Category/Category";

interface ShopProps {}

const Shop: React.FC<ShopProps> = () => {
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path="/:category" element={<Category />} />
        </Routes>
    );
};

export default Shop;
