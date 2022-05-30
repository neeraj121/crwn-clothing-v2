import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { CategoryContainer, CategoryTitle } from "./Category.style";
import { useSelector } from "react-redux";
import {
    selectCategoriesMap,
    selectIsLoading,
} from "../../store/categories/categories.selector";
import { Product } from "../../store/categories/categories.types";
import Spinner from "../../components/Spinner/Spinner";

type CategoryRouteParams = {
    category: string;
};

const Category: React.FC = () => {
    const { category } = useParams<
        keyof CategoryRouteParams
    >() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsLoading);

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return isLoading ? (
        <Spinner></Spinner>
    ) : (
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
