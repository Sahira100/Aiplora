const Bot = require("../models/Bot");

const attachBot = async (req, res, next) => {
  const { botId } = req.body;

  if (!botId) {
    throw new BadRequestError("Please provide bot");
  }

  const bot = await Bot.findById(botId);

  if (!bot) {
    throw new BadRequestError("Bot is not available");
  }

  req.bot = bot;

  next();
};

module.exports = { attachBot };
