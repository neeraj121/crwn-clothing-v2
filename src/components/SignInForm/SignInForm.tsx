import React, { useState } from "react";
import "./SignInForm.styles.scss";

import FormInput from "../FormInput/FormInput";
import Button from "../CustomButton/Button";
import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import { FirebaseError } from "firebase/app";

interface SignInFormProps {}

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm: React.FC<SignInFormProps> = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = () => {
        signInWithGooglePopup();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name in formFields) {
            setFormFields({
                ...formFields,
                [name]: value,
            });
        }
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case "auth/wrong-password":
                        alert("Incorrect username/password");
                        break;
                    case "auth/user-not-found":
                        alert("Incorrect username/password");
                        break;
                    default:
                        console.log(error);
                }
            }
            console.log(error);
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button
                        type="button"
                        buttonType="google"
                        onClick={signInWithGoogle}
                    >
                        Sign in with Google
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
