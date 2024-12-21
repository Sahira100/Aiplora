const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bot = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    model: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
    },
    creditsPerMessage: {
      type: Number,
      required: true,
    },
    provider: {
      type: String,
      //required: true,
    },
    endpoint: {
      type: String,
      //required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bot", Bot);
