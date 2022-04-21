import React from "react";
import { Category } from "../../@types/categories";
import DirectoryItem from "../DirectoryItem/DirectoryItem";
import "./Directory.styles.scss";

interface DirectoryProps {
    categories: Category[];
}

const Directory: React.FC<DirectoryProps> = ({ categories }) => {
    return (
        <div className="directory-container">
            {categories.map((category) => (
                <DirectoryItem key={category.id} category={category} />
            ))}
        </div>
    );
};

export default Directory;
