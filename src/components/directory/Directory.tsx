import React from "react";
import { Category } from "../../@types/categories";
import DirectoryItem from "../DirectoryItem/DirectoryItem";
import { DirectoryContainer } from "./Directory.styles";

interface DirectoryProps {
    categories: Category[];
}

const Directory: React.FC<DirectoryProps> = ({ categories }) => {
    return (
        <DirectoryContainer>
            {categories.map((category) => (
                <DirectoryItem key={category.id} category={category} />
            ))}
        </DirectoryContainer>
    );
};

export default Directory;
