const OpenAI = require("openai");
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const gptChatCompletion = async ({ messages, model }) => {
  const chatCompletion = await client.chat.completions.create({
    messages,
    model,
  });

  return chatCompletion;
};
