import express from "express";
import * as examController from "../controllers/exam/exam.controller.js";
import verifyToken from "../middleware/apiAuth.js";

const router = express.Router();

router.get("/:userId", verifyToken, examController.getAllExams);
router.get("/:id", verifyToken, examController.getExamById);
router.post("/add", verifyToken, examController.addNewExam);
router.post("/attempt", verifyToken, examController.attemptExam);

export default router;
