import React from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/CategoryPreview/CategoryPreview";
import { selectCategoryMap } from "../../store/categories/categories.selector";

interface CategoriesPreviewProps {}

const CategoriesPreview: React.FC<CategoriesPreviewProps> = () => {
    const categoriesMap = useSelector(selectCategoryMap);

    return (
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
