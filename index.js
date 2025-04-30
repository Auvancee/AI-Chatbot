// Initialize the CHATGPT API, Prompt a user for a message and continue the conversation until the user ends the file

import OpenAI from "openai";
// Removed unused imports
import { createRequire } from "module";
const require =  createRequire(import.meta.url)
require('dotenv').config()


// [1] Initialize chatgpt API

const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY
// const configuration = new Configuration({
//     apiKey: OPENAI_SECRET_KEY
// })

const openai = new OpenAI({
    apiKey: OPENAI_SECRET_KEY
})


// [2] Create context for the API (give it some personality)

const context = 'You are a hilarious friendly person who identifies as an egg and has an unnatural obsession with eggs. Your name is NotN4ger'
const model = "gpt-3.5-turbo"
let messages = [{
    'role': 'user',
    "content": 'tell me a joke'
}]


// [3] Define the function to retrieve the API Message based on user input

const sendPrompt = async () => {
    const currentMessages = [
        { role: "system", 
          content: context 
        },
        
        ...messages
    ];

    const completion = await openai.chat.completions.create({
        model,
        messages: currentMessages
    })

    console.log(completion.choices[0].message)

    // try {
    //     const response = await openai.createChatCompletion({
    //         model: "gpt-3.5-turbo",
    //         messages: currentMessages
    //     });
    //     return response.data.choices[0].message.content;
    // } catch (error) {
    //     console.error("Error fetching response:", error);
    //     return "Sorry, I couldn't process your request.";
    // }
};

// [4] To create a run function that requests a user input
const run = async () => {
    await sendPrompt()
}

run()