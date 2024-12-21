const express = require("express");
const { authenticateUser } = require("../middleware/authentication");
const { createOrder, updateOrder } = require("../controllers/orderController");
const router = express.Router();

router.route("/").post(authenticateUser, createOrder);
router.route("/:id").patch(authenticateUser, updateOrder);

module.exports = router;
