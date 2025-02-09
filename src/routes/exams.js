import express from "express";
import * as examController from "../controllers/exam/exam.controller.js";
import verifyToken from "../middleware/apiAuth.js";

const router = express.Router();

router.get("/:userId", examController.getAllExams);
router.get("/:id", examController.getExamById);
router.post("/add",verifyToken, examController.addNewExam);
router.post("/attempt", examController.attemptExam);

export default router;
