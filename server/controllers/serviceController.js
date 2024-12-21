const { StatusCodes } = require("http-status-codes");
const { creditAsyncWrapper } = require("../utils");
const { responseMessage } = require("../data/data");
const Message = require("../models/Message");

const { BadRequestError, InternalError } = require("../errors");
const {
  processChatCompletion,
  gptProcess,
} = require("../services/chatCompletionService");
const { unlockCredits } = require("../utils/creditsFn");
const Chat = require("../models/Chat");

const handleChatCompletionService = (req, res) => {
  const { model } = req.bot;

  switch (model) {
    case "gpt-3.5-turbo":
    case "gpt-4o-mini":
    case "gpt-4o":
      return gptProcess(req, res);
    case "gemini-1.5-flash":
      return geminiProcess(req, res);
    case "claude-3.5-sonnet":
      unlockCredits(req);
      throw new BadRequestError("The requested service bot under maintain");
    default:
      unlockCredits(req);
      throw new BadRequestError("The requested service bot could not be found");
  }
};

// const handleChatCompletionService = async (req, res) => {
//   try {
//     const {
//       _id: botId,
//       name: botName,
//       image: botImage,
//       creditsPerMessage,
//     } = req.bot;

//     const { _id: chatId } = req.chat;
//     const { message } = req.body;

//     const lastMessage = await Message.findOne({ chatId }).sort({ index: -1 });

//     const nextIndex = lastMessage ? lastMessage.index + 1 : 1;

//     //*means new message
//     if (!lastMessage) {
//       await Chat.findOneAndUpdate(
//         { _id: chatId },
//         { hint: message.substring(0, 50) }
//       );
//     }

//     const { content } = await processChatCompletion({ req });

//     res.status(StatusCodes.OK).json({
//       status: "success",
//       data: {
//         bot: {
//           id: botId,
//           name: botName,
//           image: botImage,
//         },
//         chatId,
//         usedCredits: creditsPerMessage,
//         usedPackages: req.lockedCredits,
//         message: content,
//         umId: nextIndex,
//         bmId: nextIndex + 1,
//         questions: responseMessage.questions,
//       },
//     });

//     const userMessage = {
//       chatId,
//       role: { type: "user" },
//       message,
//       index: nextIndex,
//     };

//     const botMessage = {
//       chatId,
//       role: { type: "bot", bot: botId },
//       message: content,
//       index: nextIndex + 1,
//       questions: responseMessage.questions,
//     };

//     Message.insertMany([userMessage, botMessage]).catch((error) =>
//       console.log("saving messages error")
//     );
//   } catch (error) {
//     unlockCredits(req);

//     throw error;
//   }
// };

const compareChat = creditAsyncWrapper(async (req, res) => {
  //*TODO:- compare need to avoid the prev bot response
  const { _id: botId, name, image, provider, creditsPerMessage } = req.bot;
  const { _id: chatId } = req.chat;

  const lastMessage = await Message.findOne({ chatId }).sort({ index: -1 });

  const nextIndex = lastMessage ? lastMessage.index + 1 : 1;

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      bot: {
        id: botId,
        name: name,
        image,
      },
      chatId,
      usedCredits: creditsPerMessage,
      usedPackages: req.lockedCredits,
      message: responseMessage.message,
      bmId: nextIndex + 1,
      questions: responseMessage.questions,
    },
  });

  const botMessage = {
    chatId,
    role: { type: "bot", bot: botId },
    message: responseMessage.message,
    index: nextIndex,
    questions: responseMessage.questions,
  };

  try {
    await Message.create(botMessage);
  } catch (error) {
    console.error("Error saving messages to MongoDB:", error);
  }
});

const reProcessChat = creditAsyncWrapper(async (req, res) => {
  const { _id: botId, name, image, provider, creditsPerMessage } = req.bot;
  const { _id: chatId, bot: chatBot } = req.chat;
  const { messageIndex } = req.body;

  if (!messageIndex) {
    throw new BadRequestError("Please provide message index");
  }

  const message = await Message.findOne({ chatId, index: messageIndex });

  if (!message) {
    throw new BadRequestError("Message can not found");
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      bot: {
        id: botId,
        name: name,
        image,
      },
      chatId,
      usedCredits: creditsPerMessage,
      usedPackages: req.lockedCredits,
      message: responseMessage.message,
      bmId: message.index,
      questions: responseMessage.questions,
    },
  });

  const botMessage = {
    message: responseMessage.message,
    questions: responseMessage.questions,
  };

  try {
    await Message.findByIdAndUpdate(message._id, botMessage);
  } catch (error) {
    console.error("Error saving messages to MongoDB:", error);
  }
});

module.exports = {
  handleChatCompletionService,
  compareChat,
  reProcessChat,
  reProcessChat,
};
