const express = require("express");
const validate = require("express-validation");
const router = express.Router();

const answerController = require("../controllers/answer/answer.controller");
const answerValidator = require("../controllers/answer/answer.validator");

//= ===============================
// API routes
//= ===============================

router.post(
  "/create",
  validate(answerValidator.createAnswer),
  answerController.createAnswer
);

router.delete("/");

module.exports = router;
