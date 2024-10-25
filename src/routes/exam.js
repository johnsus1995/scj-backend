const express = require("express");
const router = express.Router();

const examController = require("../controllers/exam/exam.controller");

//= ===============================
// API routes
//= ===============================
// router.get("/me", {});
router.post(
  "/create",
  examController.createExam
);

router.delete("/:id", examController.deleteExam);

module.exports = router;
