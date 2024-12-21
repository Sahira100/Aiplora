const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Credits = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    totalCredits: {
      type: Number,
      required: true,
    },
    remainingCredits: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
      index: true,
    },
    purchaseDate: {
      type: Date,
      required: true,
    },
    lastUsedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Compound index for efficient querying
Credits.index({ user: 1, expiryDate: -1 });
Credits.index({ user: 1, expiryDate: -1, remainingCredits: -1 });

module.exports = mongoose.model("Credits", Credits);
