import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subsciption";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKENS!,
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log("userID", userId);

    const body = await req.json();
    const { prompts } = body;
    if (!prompts || prompts.length === 0) {
      return new NextResponse(
        "Invalid request: messages must be a non-empty array",
        { status: 400 }
      );
    }
    console.log("prompt la ", prompts);
    // Check API limit
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Hết giới hạn sử dụng API ", { status: 403 });
    }

    //Increase API limit after success in API
    if (!isPro) {
      await increaseApiLimit();
    }

    const input = {
      prompt: prompts,
    };

    // output from Relicate will return a readable stream of audio
    const output = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      { input }
    );
    if (!output) {
      return new NextResponse("No output from Replicate", { status: 500 });
    }
    console.log("response tu replicate ");

    // -> Need to trans ReadableStream to Buffer
    // -> ReadableStream is a stream of data that can be read in chunks
    // -> Buffer is a chunk of data that can be stored in memory

    //Front-end will read blob file (buffer) and convert to audio file

    //@ts-expect-error:Get data audio from output Replicate
    const reader = output[0].getReader();
    if (!reader) {
      return new NextResponse("No reader available", { status: 500 });
    }
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }

    const response = Buffer.concat(chunks);
    return new NextResponse(response, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": "inline; filename=output.mp4",
      },
    });
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
