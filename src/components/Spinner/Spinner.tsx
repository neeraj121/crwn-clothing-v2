import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./Spinner.styles";

interface SpinnerProps {}

const Spinner: React.FC<SpinnerProps> = () => {
    return (
        <SpinnerOverlay>
            <SpinnerContainer></SpinnerContainer>
        </SpinnerOverlay>
    );
};

export default Spinner;
