import React, { useContext } from "react";
import CategoryPreview from "../../components/CategoryPreview/CategoryPreview";
import { CategoriesContext } from "../../contexts/Categories.context";

interface CategoriesPreviewProps {}

const CategoriesPreview: React.FC<CategoriesPreviewProps> = () => {
    const { categoriesMap } = useContext(CategoriesContext);

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
