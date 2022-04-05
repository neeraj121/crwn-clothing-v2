import React from "react";
import "./Button.styles.scss";

const BUTTON_TYPE_CLASSES = {
    google: "google-sign-in",
    inverted: "inverted",
};

interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    buttonType?: "google" | "inverted";
    type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<ButtonProps> = ({
    children,
    buttonType,
    ...otherProps
}) => {
    return (
        <button
            className={` ${
                buttonType && BUTTON_TYPE_CLASSES[buttonType]
            } button-container`}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export default Button;
