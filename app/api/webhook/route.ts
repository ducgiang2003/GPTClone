import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    //@ts-expect-error: headers is a function in Next.js
    const signature = headers().get("Stripe-Signature") as string;

    if (!signature) {
      return new NextResponse("Stripe signature is required", { status: 400 });
    }
    let event: Stripe.Event;

    try {
      event = Stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error: any) {
      console.log("Error:", error.message);
      return new NextResponse("Webhook Error", { status: 400 });
    }
    const session = event.data.object as Stripe.Checkout.Session;
    //Check if user success payment through Stripe
    if (event.type === "checkout.session.completed") {
      // Get the subscription details from the session
      const subscriptionResponse = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      const subscription = subscriptionResponse as Stripe.Subscription;
      if (!session.metadata?.userId) {
        return new NextResponse("User ID is must have ", { status: 400 });
      }
      // Push the subscription to your database
      await prismadb.userSubscription.create({
        data: {
          userId: session.metadata?.userId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            //@ts-expect-error: current_period_end is a property of subscription
            subscription.current_period_end * 1000
          ),
        },
      });
    }
    //Check receipt of payment from Stripe
    // This event is triggered when a payment is successful
    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      //@ts-expect-error: subscription is a property of invoice
      const subscriptionId = invoice.subscription as string;

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      await prismadb.userSubscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            //@ts-expect-error: current_period_end is a property of subscription
            subscription.current_period_end * 1000
          ),
        },
      });
    }
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.log("StripeERROR", error);
    return new NextResponse("Internal ERROR", { status: 500 });
  }
}
