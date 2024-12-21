const { CustomAPIError, InternalError } = require("../errors");
const Credits = require("../models/Credits");

const creditAsyncWrapper = (serviceFn) => async (req, res) => {
  try {
    return await serviceFn(req, res);
  } catch (error) {
    const creditsRefundOperations = [];

    req.lockedCredits.map((credit) => {
      creditsRefundOperations.push({
        updateOne: {
          filter: { _id: credit.creditId }, // First update
          update: { $inc: { remainingCredits: credit.amount } },
        },
      });
    });

    Credits.bulkWrite(creditsRefundOperations, { ordered: false })
      .then((result) => {
        console.log("Bulk write successful:", result);
      })
      .catch((error) => {
        console.error("An error occurred during bulk write:", error);
      });

    if (error instanceof CustomAPIError) {
      throw error;
    }
    throw new InternalError(error.message);
  }
};

module.exports = creditAsyncWrapper;
