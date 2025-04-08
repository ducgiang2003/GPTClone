import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  // @ts-expect-error:Dont want to use the latest version of Stripe
  apiVersion: "2022-11-15",
  typescript: true,
});
