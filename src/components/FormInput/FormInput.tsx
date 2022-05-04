import React from "react";
import { FormInputLabel, Group, Input } from "./FormInput.styles";

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
        <Group>
            {label && (
                <FormInputLabel shrink={otherProps.value.length ? true : false}>
                    {label}
                </FormInputLabel>
            )}
            <Input {...otherProps} />
        </Group>
    );
};

export default FormInput;
