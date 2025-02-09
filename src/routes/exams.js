import express from "express";
import * as examController from "../controllers/exam/exam.controller.js";

const router = express.Router();

router.post("/exams", examController.addNewExam);
router.get("/exams/:userId", examController.getAllExams);
router.get("/exams/:id", examController.getExamById);

export default router;
