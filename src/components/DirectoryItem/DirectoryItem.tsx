import React from "react";
import { Link } from "react-router-dom";
import { Category } from "../../@types/categories";
import { BackgroundImage, BodyContainer, DirectoryItemContainer } from "./DirectoryItem.styles";
import "./DirectoryItem.styles.tsx";

interface DirectoryItemProps {
    category: Category;
}

const DirectoryItem: React.FC<DirectoryItemProps> = ({ category }) => {
    const { imageUrl, title } = category;
    return (
        <DirectoryItemContainer to={`/shop/${title}`}>
            <BackgroundImage imageUrl={imageUrl} />
            <BodyContainer>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </BodyContainer>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;
