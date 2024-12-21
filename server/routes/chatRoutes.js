const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");
const {
  createChat,
  getChat,
  getAllChat,
  clearContext,
  getMessage,
  deleteMessages,
  deleteChat,
  getShareChat,
  shareChat,
} = require("../controllers/chatController");
const { attachBot } = require("../middleware/bot-middleware");

router.get("/", authenticateUser, getAllChat);
router.post("/start", authenticateUser, attachBot, createChat);
router.post("/clearContext", authenticateUser, clearContext);
router.get("/:id/message", authenticateUser, getMessage);
router.delete("/:id/message", authenticateUser, deleteMessages);
router.delete("/:id", authenticateUser, deleteChat);
router.get("/:id", authenticateUser, getChat);
router.get("/share/:id", getShareChat);
router.post("/share", authenticateUser, shareChat);

module.exports = router;
