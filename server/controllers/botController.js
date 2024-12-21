const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Bot = require("../models/Bot");

const getAllBots = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 10;

  const totalBots = await Bot.countDocuments({});
  const bots = await Bot.find({})
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      bots,
    },
    meta: {
      page,
      limit,
      totalPages: Math.ceil(totalBots / limit),
      totalBots,
      hasNextPage: page * limit < totalBots,
    },
  });
};

/*
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
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .select("-chatId")
    .lean();

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



*/
const getBot = async (req, res) => {
  const { id } = req.params;

  const bot = await Bot.findById(id);

  if (req.user.role === "admin") {
    res.status(StatusCodes.OK).json({ success: true, data: { bot } });
  } else {
    res.status(StatusCodes.OK).json({
      success: true,
      data: {
        id,
        name: bot.name,
        description: bot.description,
        image: bot.image,
        creditPerMessage: bot.creditPerMessage,
      },
    });
  }

  res.status(StatusCodes.OK).json({ msg: "bot id", user: req.user });
};

const createBot = async (req, res) => {
  const { name, description, image, credits, model } = req.body;

  if (!name || !description || !image || !credits) {
    throw new BadRequestError("Please provide valid details");
  }

  const bot = await Bot.create({
    name,
    description,
    image,
    creditsPerMessage: credits,
    model,
  });

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      bot,
    },
  });
};

const updateBot = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "bot updated" });
};

const deleteBot = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "bot deleted" });
};

module.exports = { getAllBots, getBot, createBot, updateBot, deleteBot };
