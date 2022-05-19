import { Handler } from "@netlify/functions";
import dotenv from "dotenv";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
});

dotenv.config();

export const handler: Handler = async (event) => {
    try {
        const { amount } = JSON.parse(event.body);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent }),
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            body: JSON.stringify({ error }),
        };
    }
};
