import React from "react";
import CategoryItem, { Category } from "../CategoryItem/CategoryItem";
import "./Directory.styles.scss";

interface DirectoryProps {
    categories: Category[];
}

const Directory: React.FC<DirectoryProps> = ({ categories }) => {
    return (
        <div className="directory-container">
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </div>
    );
};

export default Directory;
