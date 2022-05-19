import React from "react";
import {
    BaseButton,
    ButtonSpinner,
    GoogleSignInButton,
    InvertedButton,
} from "./Button.styles";

export const BUTTON_TYPE_CLASSES = {
    base: "base",
    google: "google-sign-in",
    inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);

interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    buttonType?: string;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    buttonType,
    isLoading,
    ...otherProps
}) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton>
    );
};

export default Button;
