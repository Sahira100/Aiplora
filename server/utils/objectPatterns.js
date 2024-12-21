const newMessage = ({
  chatId,
  chunkIndex,
  sender = { type, botId },
  message,
  isContextClear = false,
  questions = [],
}) => {};

module.exports = { newMessage };
