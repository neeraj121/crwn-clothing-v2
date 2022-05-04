import React, { useState } from "react";

import { FirebaseError } from "firebase/app";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";
import { SignUpContainer } from "./SignUpForm.styles";

interface SignUpFormProps {}

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm: React.FC<SignUpFormProps> = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

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
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const userAuth = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            if (userAuth) {
                const currentUser = { ...userAuth.user, displayName };
                await createUserDocumentFromAuth(currentUser);
                resetFormFields();
            }
        } catch (error) {
            if (
                error instanceof FirebaseError &&
                error.code === "auth/email-already-in-use"
            ) {
                alert("Cannot create user, email already in use");
            }
            console.log(error);
        }
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />
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
                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
};

export default SignUpForm;
