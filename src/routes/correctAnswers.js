import express from "express";
import * as correctAnswerController from "../controllers/correctAnswers/correctAnswers.controller.js";

const router = express.Router();

router.post("/correct-answer", correctAnswerController.addNewCorrectAnswer);

export default router;
