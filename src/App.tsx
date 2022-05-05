import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home/Home";
import Navigation from "./routes/Navigation/Navigation";
import Authentication from "./routes/Authentication/Authentication";
import Shop from "./routes/Shop/Shop";
import Checkout from "./routes/Checkout/Checkout";
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

interface AppProps {}

export const App: React.FC<AppProps> = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });
        return unsubscribe();
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop/*" element={<Shop />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="auth" element={<Authentication />} />
            </Route>
        </Routes>
    );
};

export default App;
