import React from "react";

import SignInForm from "../../components/SignInForm/SignInForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { AuthenticationContainer } from "./Authentication.styles";

interface AuthenticationProps {}

const Authentication: React.FC<AuthenticationProps> = () => {
    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    );
};

export default Authentication;
