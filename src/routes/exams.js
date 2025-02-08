import express from "express";
import * as examController from "../controllers/exam/exam.controller.js";

const router = express.Router();

router.post("/exams", examController.addNewExam);

export default router;
