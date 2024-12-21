const express = require("express");
const router = express.Router();
const {
  processChat,
  compareChat,
  reProcessChat,
  handleChatCompletionService,
} = require("../controllers/serviceController");
const { authenticateUser } = require("../middleware/authentication");
const { lockCredits } = require("../middleware/credit-middleware");
const {
  validateChat,
  validateMessage,
  validateTextGeneration,
} = require("../middleware/service-middleware");
const { attachBot } = require("../middleware/bot-middleware");

router.post(
  "/chatCompletion",
  authenticateUser,
  validateTextGeneration,
  attachBot,
  lockCredits,
  handleChatCompletionService
);

router.post(
  "/chat/compare",
  authenticateUser,
  validateChat,
  attachBot,
  lockCredits,
  compareChat
);

router.post(
  "/chat/r",
  authenticateUser,
  validateChat,
  attachBot,
  lockCredits,
  reProcessChat
);

module.exports = router;
