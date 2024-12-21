const { StatusCodes } = require("http-status-codes");
const Credits = require("../models/Credits");
const { BadRequestError, CustomAPIError } = require("../errors");
const { checkPermissions } = require("../utils");

const getAllCredits = async (req, res) => {
  const { userId } = req.user;
  const credits = await Credits.find({
    user: userId,
    expiryDate: { $gt: new Date() },
    //remainingCredits: { $gt: 0 },
  })
    .sort({ remainingCredits: -1, expiryDate: 1 })
    .select("-user -order -lastUsedAt -createdAt -updatedAt -__v");

  res.status(StatusCodes.OK).json({ status: "success", data: { credits } });
};

const getCredit = async (req, res) => {
  const { id } = req.params;

  const credit = await Credits.findById(id);

  if (!credit) {
    throw new BadRequestError("No available or valid credits found.");
  }

  checkPermissions(req.user, credit.user);

  res.status(StatusCodes.OK).json({ status: "success", data: { credit } });
};

module.exports = { getAllCredits, getCredit };
