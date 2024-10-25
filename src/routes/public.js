const express = require("express");

const userController = require("../controllers/user/user.controller");

const router = express.Router();

//= ===============================
// Public routes
//= ===============================

router.post("/login", userController.login);
router.post(
  "/register",
  userController.register,
);

module.exports = router;
