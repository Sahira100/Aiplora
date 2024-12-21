const { StatusCodes } = require("http-status-codes");
const Chat = require("../models/Chat");
const { BadRequestError } = require("../errors");
const { checkPermissions } = require("../utils");
const Message = require("../models/Message");
const { createId } = require("../utils/generateId");
const ShareChat = require("../models/ShareChat");

const getAllChat = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 20;

  const totalChats = await Chat.countDocuments({ user: req.user.userId });
  const chats = await Chat.find({ user: req.user.userId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .select("-user -__v");

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      chats,
    },
    meta: {
      page,
      limit,
      totalPages: Math.ceil(totalChats / limit),
      totalChats,
      hasNextPage: page * limit < totalChats,
    },
  });
};

const getMessage = async (req, res) => {
  const { id } = req.params;
  const { page = 1 } = req.query;
  const limit = 10;

  if (!id) {
    throw new BadRequestError("Please provide chat id");
  }

  const chat = await Chat.findById(id);

  if (!chat) {
    throw new BadRequestError("Chat is not found");
  }

  checkPermissions(req.user, chat.user);

  const totalMessages = await Message.countDocuments({ chatId: id });

  const messages = await Message.find({ chatId: id })
    .populate({
      path: "role.bot",
      select: "_id name image",
    })
    .sort({ index: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .select("-chatId -__v -_id")
    .lean();

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      messages: messages.reverse(),
    },
    meta: {
      page,
      limit,
      totalPages: Math.ceil(totalMessages / limit), // Provide total pages
      totalMessages,
      hasNextPage: page * limit < totalMessages, // Determine if there's a next page
    },
  });
};

const getChat = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("Please provide chat id");
  }

  const chat = await Chat.findById(id)
    .populate({
      path: "bot",
      select: "_id name image creditsPerMessage description",
    })
    .select("bot name createdAt updatedAt hint user")
    .lean();

  if (!chat) {
    throw new BadRequestError("couldn't find the chat");
  }

  checkPermissions(req.user, chat.user);

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      chat,
    },
  });
};

const createChat = async (req, res) => {
  const { _id } = req.bot;

  const chat = await Chat.create({
    user: req.user.userId,
    bot: _id,
    name: `convocation name ${Date.now()}`,
  });

  res.status(StatusCodes.OK).json({
    status: "success",
    data: { chatId: chat._id },
  });
};

const clearContext = async (req, res) => {
  const { chatId } = req.body;

  if (!chatId) {
    throw new BadRequestError("Please provide chat id");
  }

  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new BadRequestError("Chat is not found");
  }

  checkPermissions(req.user, chat.user);

  const lastMessage = await Message.findOne({ chatId }).sort({ index: -1 });

  if (!lastMessage) {
    res.status(StatusCodes.ok).json({
      success: true,
      message: "Context is empty",
    });
  }

  if (lastMessage.isContextClear) {
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Context is cleared already",
      data: { messageId: lastMessage.messageId },
    });
    return;
  }

  const message = await Message.create({
    chatId,
    role: {
      type: "system",
    },
    index: lastMessage.index + 1,
    sender: { type: "system" },
    isContextClear: true,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      message: {
        _id: message._id,
        role: message.role,
        index: message.index,
        isContextClear: message.isContextClear,
      },
    },
  });
};

const renameChat = async (req, res) => {
  res.send("chat renamed");
};

const shareChat = async (req, res) => {
  const { chatId } = req.body;

  if (!chatId) {
    throw new BadRequestError("Please provide details");
  }

  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new BadRequestError("Chat is not found");
  }

  checkPermissions(req.user, chat.user);

  const lastMessage = await Message.findOne({ chatId }).sort({ index: -1 });

  if (!lastMessage) {
    throw new BadRequestError("Nothing to share");
  }

  const shareChat = await ShareChat.create({
    chatId,
    upToMessageIndex: lastMessage.index,
  });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", data: { shareChatId: shareChat._id } });
};

const getShareChat = async (req, res) => {
  const { id } = req.params;
  const { page = 1 } = req.query;
  const limit = 10;

  if (!id) {
    throw new BadRequestError("Please provide share chat id");
  }

  const shareChat = await ShareChat.findById(id);

  if (!shareChat) {
    throw new BadRequestError("not found");
  }

  const totalMessages = await Message.countDocuments({
    chatId: shareChat.chatId,
    index: { $lte: shareChat.upToMessageIndex },
    "role.type": { $ne: "system" },
  });

  const messages = await Message.find({
    chatId: shareChat.chatId,
    index: { $lte: shareChat.upToMessageIndex },
    "role.type": { $ne: "system" },
  })
    .populate({
      path: "role.bot",
      select: "_id name image",
    })
    .sort({ index: 1 })
    .skip((page - 1) * limit)
    .select("role message index -_id")
    .limit(limit);

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      messages,
    },
    meta: {
      page,
      limit,
      totalPages: Math.ceil(totalMessages / limit), // Provide total pages
      totalMessages,
      hasNextPage: page * limit < totalMessages, // Determine if there's a next page
    },
  });
};

const deleteMessages = async (req, res) => {
  const { id } = req.params;
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || !messages.length > 0) {
    throw new BadRequestError("Please provide messages");
  }

  const chat = await Chat.findById(id);

  if (!chat) {
    throw new BadRequestError("Chat not found");
  }

  checkPermissions(req.user, chat.user);

  const result = await Message.deleteMany({
    chatId: id,
    index: { $in: messages },
  });

  res.status(StatusCodes.OK).json({ status: "success", data: result });
};

const deleteChat = async (req, res) => {
  const { id } = req.params;

  const chat = await Chat.findById(id);

  if (!chat) {
    throw new BadRequestError("Chat not found");
  }

  checkPermissions(req.user, chat.user);

  await Chat.deleteOne({ _id: id });

  res.status(StatusCodes.OK).json({ status: "success", data: {} });
};

module.exports = {
  createChat,
  getChat,
  getAllChat,
  clearContext,
  getMessage,
  deleteChat,
  shareChat,
  getShareChat,
  deleteMessages,
};
