const express = require("express");
const router = express.Router();

const questionController = require("../controllers/question/question.controller");

//= ===============================
// API routes
//= ===============================

router.post(
  "/create",
  questionController.createQuestion
);

router.delete("/");

module.exports = router;
