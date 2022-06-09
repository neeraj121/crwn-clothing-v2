import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./routes/Navigation/Navigation";
import { checkUserSession } from "./store/user/user.action";
import { useDispatch } from "react-redux";
import Spinner from "./components/Spinner/Spinner";

const Home = lazy(() => import("./routes/Home/Home"));
const Shop = lazy(() => import("./routes/Shop/Shop"));
const Checkout = lazy(() => import("./routes/Checkout/Checkout"));
const Authentication = lazy(
    () => import("./routes/Authentication/Authentication")
);

export const App: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkUserSession());
    }, [dispatch]);

    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="shop/*" element={<Shop />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="auth" element={<Authentication />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
