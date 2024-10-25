const express = require("express");
const router = express.Router();

const answerController = require("../controllers/answer/answer.controller");

//= ===============================
// API routes
//= ===============================

router.post(
  "/create",
  answerController.createAnswer
);

router.delete("/");

module.exports = router;
