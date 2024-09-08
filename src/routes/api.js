const express = require("express");
const validate = require("express-validation");
const router = express.Router();

const userController = require("../controllers/user/user.controller");
const userValidator = require("../controllers/user/user.validator");


//= ===============================
// API routes
//= ===============================
router.get("/me", userController.profile);
router.post(
  "/changePassword",
  validate(userValidator.changePassword),
  userController.changePassword
);

module.exports = router;
