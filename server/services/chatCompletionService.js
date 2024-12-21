const OpenAI = require("openai/index.mjs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Message = require("../models/Message");
const { BadRequestError, InternalError } = require("../errors");
const { unlockCredits } = require("../utils/creditsFn");
const Chat = require("../models/Chat");
const { gptPrompt } = require("../prompts");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const processChatCompletion = ({ req }) => {
  const {
    _id: botId,
    name: botName,
    image: botImage,
    creditsPerMessage,
    model,
  } = req.bot;
  const { _id: chatId } = req.chat;
  const { message } = req.body;

  switch (model) {
    case "gpt-3.5-turbo":
    case "gpt-4o-mini":
    case "gpt-4o":
      return gptProcess({ chatId, message, model });
    case "gemini-1.5-flash":
      return geminiProcess({ chatId, message, model });
    case "claude-3.5-sonnet":
      throw new BadRequestError("The requested service bot under maintain");
    default:
      throw new BadRequestError("The requested service bot could not be found");
  }
};

const gptProcess = async (req, res) => {
  try {
    const { _id: chatId } = req.chat;
    const {
      _id: botId,
      name: botName,
      image: botImage,
      creditsPerMessage,
      model,
    } = req.bot;
    const { message } = req.body;

    const lastMessage = await Message.findOne({ chatId }).sort({ index: -1 });

    const nextIndex = lastMessage ? lastMessage.index + 1 : 1;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const prevMessages = await Message.find({ chatId }).sort({ index: 1 });
    const filteredMessages = [];

    for (let m of prevMessages) {
      if (m.isContextClear) {
        break;
      }
      const role = m.role.type === "bot" ? "assistant" : m.role.type;
      filteredMessages.push({ role, content: m.message });
    }

    const messages = [
      {
        role: "system",
        content: gptPrompt,
      },
      ...filteredMessages,
      { role: "user", content: message },
    ];

    let streamContent = "";

    if (!lastMessage) {
      await Chat.findOneAndUpdate(
        { _id: chatId },
        { hint: message.substring(0, 50) }
      );
    }

    const stream = await client.chat.completions.create({
      model,
      messages,
      stream: true,
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: { type: "text" },
    });

    // res.on("close", () => {
    //   console.log("Client disconnected, stopping stream.");
    //   stream.controller.abort();
    // });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      streamContent += content;
      res.write(`data: ${JSON.stringify({ message: content })}\n\n`);
    }

    res.write(
      `data: ${JSON.stringify({
        meta: {
          bot: {
            id: botId,
            name: botName,
            image: botImage,
          },
          chatId,
          usedCredits: creditsPerMessage,
          usedPackages: req.lockedCredits,
          message: streamContent,
          umId: nextIndex,
          bmId: nextIndex + 1,
          questions: [],
        },
      })}\n\n`
    );
    res.status(200).end();

    const userMessage = {
      chatId,
      role: { type: "user" },
      message,
      index: nextIndex,
    };

    const botMessage = {
      chatId,
      role: { type: "bot", bot: botId },
      message: streamContent,
      index: nextIndex + 1,
      questions: [],
    };

    Message.insertMany([userMessage, botMessage]).catch((error) =>
      console.log("saving messages error")
    );
  } catch (error) {
    unlockCredits(req);

    throw new InternalError("Something went wrong");
  }
};

const geminiProcess = async ({ chatId, message, model }) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const prevMessages = await Message.find({ chatId }).sort({ index: 1 });
  const filteredMessages = [];

  for (let m of prevMessages) {
    if (m.isContextClear) {
      break;
    }
    const role = m.role.type === "bot" ? "model" : m.role.type;

    filteredMessages.push({ role, parts: [{ text: m.message }] });
  }

  const history = [...filteredMessages];

  const geminiModel = genAI.getGenerativeModel({ model });
  const chat = geminiModel.startChat({
    history,
  });

  let result = await chat.sendMessage(message);

  return {
    content: result.response.text(),
  };
};

module.exports = { gptProcess, geminiProcess, processChatCompletion };
