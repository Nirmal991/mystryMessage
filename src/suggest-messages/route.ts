import OpenAI from "openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'.`;

    const result = await streamText({
      model: "openai/gpt-5.3-chat", 
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return result.toTextStreamResponse();

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}