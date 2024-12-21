const mongoose = require("mongoose");
const { Schema } = mongoose;

const PackageSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    credits: {
      type: Number,
      required: [true, "Please provide total credits"],
      min: [0, "credits cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
      min: [0, "Price cannot be negative"],
    },
    validDays: {
      type: Number,
      required: [true, "please provide valid days"],
    },
    available: {
      type: Boolean,
      required: [true, "Please specify if the package is available for users"],
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", PackageSchema);
