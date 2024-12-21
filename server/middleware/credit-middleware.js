const Credits = require("../models/Credits");
const { BadRequestError, CustomAPIError, InternalError } = require("../errors");
const { startSession } = require("mongoose");

const lockCredits = async (req, res, next) => {
  const lockedCredits = [];
  const session = await startSession();

  try {
    session.startTransaction();

    const credits = await Credits.find({
      user: req.user.userId,
      expiryDate: { $gt: new Date() },
      remainingCredits: { $gt: 0 },
    })
      .sort({ expiryDate: 1 })
      .session(session);

    if (!credits.length) {
      throw new BadRequestError("No available or valid credits found.");
    }

    let remainingServiceCreditFee = req.bot.creditsPerMessage;
    const bulkOperations = [];

    for (let i = 0; i < credits.length && remainingServiceCreditFee > 0; i++) {
      const { _id, remainingCredits: avCredits } = credits[i];

      if (avCredits >= remainingServiceCreditFee) {
        lockedCredits.push({
          creditId: _id,
          amount: remainingServiceCreditFee,
        });

        bulkOperations.push({
          updateOne: {
            filter: { _id },
            update: {
              $inc: { remainingCredits: -remainingServiceCreditFee },
            },
          },
        });
        remainingServiceCreditFee = 0;
      } else {
        lockedCredits.push({ creditId: _id, amount: avCredits });

        bulkOperations.push({
          updateOne: {
            filter: { _id },
            update: {
              $inc: { remainingCredits: -avCredits },
            },
          },
        });
        remainingServiceCreditFee -= avCredits;
      }
    }

    if (remainingServiceCreditFee > 0) {
      throw new BadRequestError("Not enough credits.");
    }

    if (bulkOperations.length > 0) {
      await Credits.bulkWrite(bulkOperations, { session });
    }

    await session.commitTransaction();
    req.lockedCredits = lockedCredits;

    next();
  } catch (error) {
    await session.abortTransaction();

    if (error instanceof CustomAPIError) {
      throw error;
    }

    throw new InternalError("Something Went Wrong");
  } finally {
    session.endSession();
  }
};

module.exports = { lockCredits };
