import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { BUTTON_TYPE_CLASSES } from "../Button/Button";
import {
    FormContainer,
    PaymentButton,
    PaymentFormContainer,
} from "./PaymentForm.styles";

interface PaymentFormProps {}

const PaymentForm: React.FC<PaymentFormProps> = () => {
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler: React.FormEventHandler<HTMLFormElement> = async (
        event
    ) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        setIsProcessingPayment(true);

        const response = await fetch(
            "/.netlify/functions/create-payment-intent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: amount * 100,
                }),
            }
        ).then((res) => res.json());

        setIsProcessingPayment(false);

        const clientSecret: string = response.paymentIntent.client_secret;
        const cardElement = elements.getElement(CardElement);
        if (cardElement) {
            const paymentResult = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name:
                                currentUser && currentUser.displayName
                                    ? currentUser.displayName
                                    : "Guest",
                        },
                    },
                }
            );

            if (paymentResult.error) {
                alert(paymentResult.error.message);
            } else {
                if (paymentResult.paymentIntent.status === "succeeded") {
                    alert("Payment Successful");
                }
            }
        }
    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton
                    isLoading={isProcessingPayment}
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                >
                    Pay now
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;
