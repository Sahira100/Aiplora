const validateModel = (config, name) => {
  if (name.includes("gpt")) {
    const requiredFields = [
      "tokens",
      "maxTokens",
      "temperature",
      "topP",
      "frequencyPenalty",
      "presencePenalty",
    ];
    return requiredFields.every((field) => config.has(field));
  }
  return false;
};

module.exports = validateModel;
