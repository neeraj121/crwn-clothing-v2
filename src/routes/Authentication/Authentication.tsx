import React from "react";
import "./Authentication.styles.scss";

import SignInForm from "../../components/SignInForm/SignInForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

interface AuthenticationProps {}

const Authentication: React.FC<AuthenticationProps> = () => {
    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;
