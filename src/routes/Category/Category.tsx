import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../@types/product";
import { CategoriesContext } from "../../contexts/Categories.context";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Category.style.scss";

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
            <h1>{category?.toUpperCase()}</h1>
            <div className="category-container">
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </div>
    );
};

export default Category;
