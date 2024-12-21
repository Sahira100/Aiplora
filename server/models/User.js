const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 15,
      validate: {
        validator: function (value) {
          return !/\s/.test(value);
        },
        message: "name should not contain spaces",
      },
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 8,
      validate: {
        validator: function (value) {
          return !/\s/.test(value);
        },
        message: "Password should not contain spaces",
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationTokenExpirationDate: {
      type: Date,
    },
    verified: Date,
    passwordToken: {
      type: String,
    },
    passwordTokenExpirationDate: {
      type: Date,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.index({ email: 1 }, { unique: true });

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

UserSchema.virtual("activeSubs", {
  ref: "UserModelSubscription",
  localField: "_id",
  foreignField: "user",
  justOne: false,
  match: {
    expiryDate: { $gt: new Date() },
  },
});

module.exports = mongoose.model("User", UserSchema);
