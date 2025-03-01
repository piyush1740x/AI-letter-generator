import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
    try {
        const { mood, herName,yourName } = await req.json(); 

        if (!herName || !yourName || !mood) {
            return Response.json({ error: "Name and mood are required" }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `Write a ${mood} love letter in hinglish for my girlfriend named ${herName} and my name is ${yourName}. dont write "Okay, here's a romantic love letter in Hinglish for Payal from Piyush:" this lind of thing just start writing letter `;
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();

        return Response.json({ letter: responseText }, { status: 200 });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
