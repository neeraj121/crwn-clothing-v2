import React from "react";
import { Link } from "react-router-dom";
import { Category } from "../../@types/categories";
import "./DirectoryItem.styles.scss";

interface DirectoryItemProps {
    category: Category;
}

const DirectoryItem: React.FC<DirectoryItemProps> = ({ category }) => {
    const { imageUrl, title } = category;
    return (
        <Link to={`/shop/${title}`} className="directory-item-container">
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <div className="body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </Link>
    );
};

export default DirectoryItem;
