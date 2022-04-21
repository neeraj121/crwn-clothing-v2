import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../@types/product";
import ProductCard from "../ProductCard/ProductCard";
import "./CategoryPreview.styles.scss";

interface CategoryPreviewProps {
    title: string;
    products: Product[];
}

const CategoryPreview: React.FC<CategoryPreviewProps> = ({
    title,
    products,
}) => {
    return (
        <div className="category-preview-container">
            <h2>
                <Link to={title} className="title">
                    {title.toUpperCase()}
                </Link>
            </h2>
            <div className="preview">
                {products
                    .filter((_, idx) => idx < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </div>
    );
};

export default CategoryPreview;
