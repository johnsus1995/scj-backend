import express from "express";
import * as attemptedAnswerController from "../controllers/attemptedAnswers/attemptedAnswers.controller.js";

const router = express.Router();

router.post("/attempt", attemptedAnswerController.attemptAnswer);

export default router;
