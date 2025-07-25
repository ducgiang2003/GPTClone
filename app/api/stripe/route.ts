import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";

const settingsUrl = absoluteUrl("/settings");

console.log("hello");

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = user.id;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId,
      },
    });
    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            unit_amount: 500,
            product_data: {
              name: "Super Ultra Genus",
              description: "Super Ultra Genus with Gemini",
            },
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });
    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("StripeERROR", error);
    return new NextResponse("Internal ERROR", { status: 500 });
  }
}
