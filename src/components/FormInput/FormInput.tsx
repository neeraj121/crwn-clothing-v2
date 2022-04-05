import React from "react";
import "./FormInput.styles.scss";

interface FormInputProps {
    label?: string;
    type?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    required?: boolean;
    name: string;
    value: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, ...otherProps }) => {
    return (
        <div className="group">
            {label && (
                <label
                    className={`${
                        otherProps.value.length ? "shrink" : null
                    } form-input-label`}
                >
                    {label}
                </label>
            )}
            <input className="form-input" {...otherProps} />
        </div>
    );
};

export default FormInput;
