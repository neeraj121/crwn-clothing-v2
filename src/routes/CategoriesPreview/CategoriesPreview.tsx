import React from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/CategoryPreview/CategoryPreview";
import Spinner from "../../components/Spinner/Spinner";
import {
    selectCategoriesMap,
    selectIsLoading,
} from "../../store/categories/categories.selector";

interface CategoriesPreviewProps {}

const CategoriesPreview: React.FC<CategoriesPreviewProps> = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsLoading);

    return isLoading ? (
        <Spinner></Spinner>
    ) : (
        <>
            {Object.keys(categoriesMap).map((title) => {
                return (
                    <CategoryPreview
                        key={title}
                        title={title}
                        products={categoriesMap[title]}
                    />
                );
            })}
        </>
    );
};

export default CategoriesPreview;
