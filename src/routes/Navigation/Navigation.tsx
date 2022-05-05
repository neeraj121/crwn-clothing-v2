import React, { useContext } from "react";

import "./Navigation.styles.tsx";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/CartIcon/CartIcon";
import CartDropdown from "../../components/CartDropdown/CartDropdown";
import { CartContext } from "../../contexts/Cart.context";
import {
    LogoContainer,
    NavigationContainer,
    NavLinkContainer,
    NavLink,
} from "./Navigation.styles";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation: React.FC = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { isCartOpen } = useContext(CartContext);

    const signOutHandler = async () => {
        await signOutUser();
    };

    return (
        <>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinkContainer>
                    <NavLink to="/shop">SHOP</NavLink>
                    {currentUser ? (
                        <NavLink as="span" onClick={signOutHandler}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to="/auth">SIGN IN</NavLink>
                    )}
                    <CartIcon />
                </NavLinkContainer>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </>
    );
};

export default Navigation;
