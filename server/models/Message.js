const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  chatId: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: [true, "Please provide chat Id"],
  },
  index: {
    type: Number,
    required: true,
  },
  // chunkIndex: {
  //   type: Number,
  //   required: true,
  // },
  role: {
    type: { type: String, enum: ["user", "bot", "system"], required: true },
    bot: { type: mongoose.SchemaTypes.ObjectId, ref: "Bot" },
  },
  message: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isContextClear: {
    type: Boolean,
    default: false,
  },
  questions: {
    type: [String],
    default: [],
  },
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
