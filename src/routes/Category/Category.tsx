import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { CategoryContainer, CategoryTitle } from "./Category.style";
import { useSelector } from "react-redux";
import { selectCategoryMap } from "../../store/categories/categories.selector";
import { Product } from "../../store/categories/categories.types";

interface CategoryProps {}

const Category: React.FC<CategoryProps> = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoryMap);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (category) {
            setProducts(categoriesMap[category]);
        }
    }, [category, categoriesMap]);

    return (
        <div>
            <CategoryTitle>{category?.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </CategoryContainer>
        </div>
    );
};

export default Category;
