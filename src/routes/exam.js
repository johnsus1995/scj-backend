const express = require("express");
const validate = require("express-validation");
const router = express.Router();

const examController = require("../controllers/exam/exam.controller");
const examValidator = require("../controllers/exam/exam.validator");

//= ===============================
// API routes
//= ===============================
router.get("/me", {});
router.post(
  "/create",
  validate(examValidator.changePassword),
  examController.createExam
);

module.exports = router;
