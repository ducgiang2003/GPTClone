import prismadb from "@/lib/prismadb"; // Đảm bảo bạn đã cấu hình Prisma đúng
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 500 });
    }
    const userId = user.id;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 500 });
    }

    const userAPiLimit = await prismadb.userAPILimit.upsert({
      where: {
        userId: userId,
      },
      update: {},
      create: {
        userId: userId,
        count: 0,
        dateReset: new Date(),
      },
    });

    const lastResetDate = new Date(userAPiLimit.dateReset);

    const today = new Date();

    if (lastResetDate.toDateString() !== today.toDateString()) {
      await prismadb.userAPILimit.update({
        where: {
          userId,
        },
        data: {
          count: 0,
          dateReset: today,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      "code" in error
    ) {
      const customError = error as MyCustomError;
      return new NextResponse(`Error: ${customError.message}`, {
        status: customError.code,
      });
    } else if (error instanceof Error) {
      console.error("Error message:", error.message);
      return new NextResponse(`Error: ${error.message}`, { status: 500 });
    } else {
      console.error("Unknown error:", error);
      return new NextResponse("Unknown error occurred", { status: 500 });
    }
  }
}
