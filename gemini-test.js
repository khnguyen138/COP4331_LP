import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {

    const model = genAI.getGenerativeModel({model: "gemini-2.0-flash", 
        systemInstruction: "You are a world tour guide that currates travel plans based on a quiz done before speaking to you."});

    const prompt = "Outdoor activities in Turin, Italy";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    
}

run();  // Call the run function to execute the code
