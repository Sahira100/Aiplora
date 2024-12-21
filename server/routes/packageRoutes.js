const express = require("express");
const router = express.Router();
const {
  createPackage,
  getAllPackages,
  getSinglePackage,
  updatePackage,
} = require("../controllers/packageController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router
  .route("/")
  .post(authenticateUser, authorizePermissions("admin"), createPackage)
  .get(authenticateUser, authorizePermissions("admin"), getAllPackages);

router
  .route("/:id")
  .get(authenticateUser, authorizePermissions("admin"), getSinglePackage)
  .patch(authenticateUser, authorizePermissions("admin"), updatePackage);

module.exports = router;
