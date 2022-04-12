import React, { useContext } from "react";
import { Product } from "../../@types/product";
import { CartContext } from "../../contexts/Cart.context";
import Button from "../CustomButton/Button";
import "./ProductCard.scss";

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType="inverted" onClick={addProductToCart}>
                Add to cart
            </Button>
        </div>
    );
};
