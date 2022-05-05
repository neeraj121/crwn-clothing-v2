import React from "react";
import { Product } from "../../store/categories/categories.types";
import ProductCard from "../ProductCard/ProductCard";
import {
    CategoryPreviewContainer,
    Preview,
    Title,
} from "./CategoryPreview.styles";

interface CategoryPreviewProps {
    title: string;
    products: Product[];
}

const CategoryPreview: React.FC<CategoryPreviewProps> = ({
    title,
    products,
}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {products
                    .filter((_, idx) => idx < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </Preview>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;
