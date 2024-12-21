const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bot: {
      type: Schema.Types.ObjectId,
      ref: "Bot",
      required: true,
    },
    name: {
      type: String,
      default: "Class of 2024 Convocation",
    },
    hint: {
      type: String,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
