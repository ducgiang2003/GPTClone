import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_400;

export const checkSubscription = async (): Promise<Boolean> => {
  try {
    const user = await currentUser();
    if (!user) {
      return false;
    }
    const userId = user.id;
    if (!userId) {
      return false;
    }
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId: userId,
      },
      select: {
        stripeCurrentPeriodEnd: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
        stripePriceId: true,
      },
    });
    if (!userSubscription || !userSubscription.stripeCurrentPeriodEnd) {
      return false;
    }
    const isValid =
      userSubscription.stripePriceId &&
      userSubscription.stripeCurrentPeriodEnd?.getTime() >
        Date.now() + DAY_IN_MS;
    //Ensure isValid is boolean (!!)
    return !!isValid;
  } catch (error) {
    console.error("Error message:", error);
    return false;
  }
};
