const generate = require("nanoid/generate");

const createId = () => {
  return generate("1234567890abcdef", 10);
};

module.exports = { createId };
