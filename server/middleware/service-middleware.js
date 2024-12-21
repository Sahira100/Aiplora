const { BadRequestError } = require("../errors");
const Bot = require("../models/Bot");
const Chat = require("../models/Chat");
const { checkPermissions } = require("../utils");

const validateTextGeneration = async (req, res, next) => {
  console.log(req.body);
  const { chatId, message } = req.body;

  if (!chatId) {
    throw new BadRequestError("Please provide chat id");
  }

  const chat = await Chat.findById(chatId).select("user bot");

  if (!chat) {
    throw new BadRequestError("Chat is not found");
  }
  // if (!message || message.trim() > 0) {
  //   throw new BadRequestError("Please provide message");
  // }

  checkPermissions(req.user, chat.user);
  req.chat = chat;

  next();
};

const validateChat = async (req, res, next) => {
  const { chatId } = req.body;

  if (!chatId) {
    throw new BadRequestError("Please provide chat id");
  }

  const chat = await Chat.findById(chatId).select("user bot");

  if (!chat) {
    throw new BadRequestError("Chat is not found");
  }

  checkPermissions(req.user, chat.user);

  req.chat = chat;

  next();
};

const validateMessage = async (req, res, next) => {
  const { message } = req.body;

  if (!message || message.trim() > 0) {
    throw new BadRequestError("Please provide message");
  }

  next();
};

module.exports = { validateChat, validateMessage, validateTextGeneration };
