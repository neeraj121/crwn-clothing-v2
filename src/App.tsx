import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home/Home";
import Navigation from "./routes/Navigation/Navigation";
import SignIn from "./routes/SignIn/SignIn";

interface AppProps {}

const Shop: React.FC = () => {
    return <div>I am the shop page</div>;
};

export const App: React.FC<AppProps> = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="sign-in" element={<SignIn />} />
            </Route>
        </Routes>
    );
};

export default App;
