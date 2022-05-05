import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setCategoriesMap } from "../../store/categories/categories.action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import CategoriesPreview from "../CategoriesPreview/CategoriesPreview";
import Category from "../Category/Category";

interface ShopProps {}

const Shop: React.FC<ShopProps> = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getCategories = async () => {
            const categoryMapResponse = await getCategoriesAndDocuments();
            dispatch(setCategoriesMap(categoryMapResponse));
        };
        getCategories();
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path="/:category" element={<Category />} />
        </Routes>
    );
};

export default Shop;
