const express = require("express");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  getAllBots,
  getBot,
  createBot,
  updateBot,
  deleteBot,
} = require("../controllers/botController");
const router = express.Router();

router.get("/", authenticateUser, getAllBots);
router.get("/:id", authenticateUser, getBot);

router.delete(
  "/:id",
  authenticateUser,
  authorizePermissions("admin"),
  deleteBot
);

router.post("/", authenticateUser, authorizePermissions("admin"), createBot);
router.patch("/", authenticateUser, authorizePermissions("admin"), updateBot);

module.exports = router;
