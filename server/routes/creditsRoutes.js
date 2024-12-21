const express = require("express");
const { getAllCredits } = require("../controllers/creditsController");
const { authenticateUser } = require("../middleware/authentication");
const router = express.Router();

router.get("/", authenticateUser, getAllCredits);

module.exports = router;
