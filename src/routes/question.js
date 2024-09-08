const express = require("express");
const validate = require("express-validation");
const router = express.Router();

const questionController = require("../controllers/question/question.controller");
const questionValidator = require("../controllers/question/question.validator");

//= ===============================
// API routes
//= ===============================

router.post(
  "/create",
  validate(questionValidator.createQuestion),
  questionController.createQuestion
);

router.delete("/");

module.exports = router;
