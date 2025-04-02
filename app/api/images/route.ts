import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, Part } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp-image-generation" });

export async function POST(req: NextRequest) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { prompts, amount = "1", resolution = "256x256" } = body;
        const parsedAmount = parseInt(amount, 10);
        const finalAmount = isNaN(parsedAmount) ? 1 : parsedAmount;

      
        //Instruction with description for Gemini AI
        const parts: Part[] = [
            { text: `Tạo ${finalAmount} hình ảnh với những dòng mô tả sau : ${prompts}. Độ phân giải : ${resolution}.` }
        ];

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig: {
                maxOutputTokens: 2048, 
                //@ts-expect-error : Dont need to show above error because this have on 
                //Google Generative AI documentation
                responseModalities: ["Text", "Image"],  
            },
        });
        

        const response = await result.response;
        const candidates = response.candidates;

        if (!candidates || candidates.length === 0 || !candidates[0].content || !candidates[0].content.parts) {
            return new NextResponse("No valid image data found in response.", { status: 500 });
        }
        
        const base64Images: string[] = [];
        //Return with message 
        let textResponse: string = "";

        for (const part of candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.mimeType && part.inlineData.mimeType.startsWith("image/") && part.inlineData.data) {
                base64Images.push(part.inlineData.data);
            } else if (part.text) {
                textResponse = part.text;
            } 
        }

        if (base64Images.length === 0 && !Array.isArray(base64Images)  ) {
            console.log("No img was made")
            return new NextResponse(`No image or URL found in the response. ${textResponse}`, { status: 500 });
        }
        //Return with base64Images with message 
        textResponse = textResponse || "Ảnh đã được tạo ra thành công ";

        return NextResponse.json({ base64Images, message: textResponse });

    } catch (error) {
        if (typeof error === "object" && error !== null && "message" in error && "code" in error) {
            const customError = error as MyCustomError;
            return new NextResponse(`Error in image route: ${customError.message}`, { status: customError.code });
        } else if (error instanceof Error) {
            console.error("Error message img route:", error.message);
            return new NextResponse(`Error img route:: ${error.message}`, { status: 500 });
        } else {
            console.error("Unknown error img route:", error);
            return new NextResponse("Unknown error img route occurred", { status: 500 });
        }
    }
}
