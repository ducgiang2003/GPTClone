import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { timezone } = body;

    if (!timezone || typeof timezone !== "string") {
      return new NextResponse("Invalid timezone", { status: 400 });
    }

    // Kiểm tra nếu đã tồn tại user, thì update timezone
    await prismadb.userAPILimit.upsert({
      where: {
        userId: user.id,
      },
      update: {
        timeZone: timezone,
      },
      create: {
        userId: user.id,
        count: 0,
        timeZone: timezone,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving timezone", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
