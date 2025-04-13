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
    // const { userId } = getAuth(req);
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    // console.log("userID", userId);

    const body = await req.json();
    const { prompts } = body;
    if (!prompts || prompts.length === 0) {
      return new NextResponse(
        "Invalid request: messages must be a non-empty array",
        { status: 400 }
      );
    }
    // // Check API limit
    // const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();

    // if (!freeTrial && !isPro) {
    //   return new NextResponse("Hết giới hạn sử dụng API ", { status: 403 });
    // }

    // //Increase API limit after success in API
    // if (!isPro) {
    //   await increaseApiLimit();
    // }

    // Trả về kết quả dưới dạng JSON
    const response = await replicate.run(
      "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
      {
        input: {
          top_k: 250,
          top_p: 0,
          prompt: prompts,
          duration: 8,
          temperature: 1,
          continuation: false,
          model_version: "stereo-large",
          output_format: "mp3",
          continuation_start: 0,
          multi_band_diffusion: false,
          normalization_strategy: "peak",
          classifier_free_guidance: 3,
        },
      }
    );

    return NextResponse.json(response);
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
