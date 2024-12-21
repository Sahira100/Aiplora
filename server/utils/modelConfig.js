const { BadRequestError } = require("../errors");

const models = ["gpt-3", "gpt-4", "gpt-3.5-turbo"];

const gptConfig = ({
  maxTokens = 2800,
  temperature = 0.7,
  topP = 0.9,
  frequencyPenalty = 0,
  presencePenalty = 0,
}) => {
  return {
    maxTokens,
    temperature,
    topP,
    frequencyPenalty,
    presencePenalty,
  };
};

module.exports = { gptConfig, models };
