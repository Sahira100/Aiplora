const mongoose = require("mongoose");
const Credits = require("./Credits");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    total: {
      type: Number,
      required: true,
    },
    packages: [
      {
        packageId: {
          type: Schema.Types.ObjectId,
          ref: "Package",
        },
        quantity: {
          type: Number,
          required: true,
        },
        credits: {
          type: Number,
          required: true,
        },
        validDays: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    purchaseDate: {
      type: Date,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

OrderSchema.index({ user: 1 });
OrderSchema.index({ user: 1, status: 1 });

createCredits = async (order) => {
  const userCredits = order.packages.map((pkg) => {
    const totalCredits = pkg.credits * pkg.quantity;
    const expiryDate = new Date(order.purchaseDate);
    expiryDate.setDate(expiryDate.getDate() + pkg.validDays);

    return {
      user: order.user,
      order: order._id,
      totalCredits,
      remainingCredits: totalCredits,
      purchaseDate: order.purchaseDate,
      expiryDate,
    };
  });

  await Credits.insertMany(userCredits);
};

OrderSchema.pre("save", async function () {
  if (this.isModified("status") && this.status === "completed") {
    await createCredits(this);
  }
});

module.exports = mongoose.model("Order", OrderSchema);
