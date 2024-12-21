const Credits = require("../models/Credits");

const unlockCredits = async (req) => {
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
      console.log("Credits unlocked");
    })
    .catch((error) => {
      console.error("Error on unlock credits");
    });
};

module.exports = { unlockCredits };
