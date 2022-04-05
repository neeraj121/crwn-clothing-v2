import React from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

interface SignInProps {}

const SignIn: React.FC<SignInProps> = ({}) => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>

            <SignUpForm />
        </div>
    );
};

export default SignIn;
