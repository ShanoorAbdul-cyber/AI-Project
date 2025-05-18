import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { messages } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      // model: "gpt-3.5-turbo", // or "gpt-4"
      model: "gpt-4o-mini",
      store: true,
      messages,
    });

    return Response.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return Response.json({ response: `Error: ${error.message || "Unknown error"}` });
  }
}


