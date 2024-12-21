const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShareChatSchema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    upToMessageIndex: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ShareChat = mongoose.model("ShareChat", ShareChatSchema);
module.exports = ShareChat;
