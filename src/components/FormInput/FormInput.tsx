import React, { InputHTMLAttributes } from "react";
import { FormInputLabel, Group, Input } from "./FormInput.styles";

type FormInputProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: React.FC<FormInputProps> = ({ label, ...otherProps }) => {
    return (
        <Group>
            {label && (
                <FormInputLabel
                    shrink={Boolean(
                        otherProps.value &&
                            typeof otherProps.value === "string" &&
                            otherProps.value.length
                    )}
                >
                    {label}
                </FormInputLabel>
            )}
            <Input {...otherProps} />
        </Group>
    );
};

export default FormInput;
