import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { Product } from "../../store/categories/categories.types";
import Button, { BUTTON_TYPE_CLASSES } from "../Button/Button";
import {
    Footer,
    Name,
    Price,
    ProductCardContainer,
} from "./ProductCard.styles";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { name, price, imageUrl } = product;

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                onClick={addProductToCart}
            >
                Add to cart
            </Button>
        </ProductCardContainer>
    );
};

export default ProductCard;
