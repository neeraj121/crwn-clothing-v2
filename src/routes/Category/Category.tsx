import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../@types/product";
import { CategoriesContext } from "../../contexts/Categories.context";
import ProductCard from "../../components/ProductCard/ProductCard";
import { CategoryContainer, CategoryTitle } from "./Category.style";

interface CategoryProps {}

const Category: React.FC<CategoryProps> = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
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
