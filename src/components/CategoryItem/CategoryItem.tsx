import React from "react";
import "./CategoryItem.styles.scss";

export type Category = {
    id: number;
    title: string;
    imageUrl: string;
};

interface CategoryItemProps {
    category: Category;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
    const { imageUrl, title } = category;
    return (
        <div className="category-container">
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <div className="category-body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    );
};

export default CategoryItem;
