import React, { useContext } from "react";
import "./Shop.styles.scss";
import { ProductsContext } from "../../contexts/Products.context";
import { ProductCard } from "../../components/ProductCard/ProductCard";

interface ShopProps {}

const Shop: React.FC<ShopProps> = () => {
    const { products } = useContext(ProductsContext);

    return (
        <div className="products-container">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default Shop;
