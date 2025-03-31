
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { Content, GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
            return new NextResponse("Invalid request: messages must be a non-empty array", { status: 400 });
        }

        console.log("Received messages:", JSON.stringify(body.messages, null, 2));

       //Riêng Gemini thì phải dùng parts để chia làm 2 phần , 1 phần text và 1 phần image
        const geminiParts = body.messages.map((message: { parts: { text: string }[] }) => ({
            text: message.parts[0].text
    
        }));
        console.log("Gemini parts:", JSON.stringify(geminiParts, null, 2));
        //Payload là phần dữ liệu gửi lên cho Gemini
        const geminiPayload = {
            contents: [{ parts: geminiParts }] as Content[],
        };
        console.log("Gemini payload:", JSON.stringify(geminiPayload, null, 2));

        // Gọi API Gemini
        const result = await model.generateContent(geminiPayload);

        // Kiểm tra kết quả
        if (!result) {
            return new NextResponse("Failed to generate content.", { status: 500 });
        }

        // Trả về kết quả dưới dạng JSON
        const response = await result.response;
        return NextResponse.json({ messages: response.text() });

    } catch (error) {
        if (typeof error === "object" && error !== null && "message" in error && "code" in error) {
            const customError = error as MyCustomError;
            return new NextResponse(`Error: ${customError.message}`, { status: customError.code });
        } else if (error instanceof Error) {
            console.error("Error message:", error.message);
            return new NextResponse(`Error: ${error.message}`, { status: 500 });
        } else {
            console.error("Unknown error:", error);
            return new NextResponse("Unknown error occurred", { status: 500 });
        }
    }
}
