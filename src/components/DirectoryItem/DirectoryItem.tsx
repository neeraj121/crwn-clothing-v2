import React from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "../../store/categories/categories.types";
import {
    BackgroundImage,
    BodyContainer,
    DirectoryItemContainer,
} from "./DirectoryItem.styles";
import "./DirectoryItem.styles.tsx";

interface DirectoryItemProps {
    category: Category;
}

const DirectoryItem: React.FC<DirectoryItemProps> = ({ category }) => {
    const { imageUrl, title } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => {
        navigate(`/shop/${title}`);
    };

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <BodyContainer>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </BodyContainer>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;
