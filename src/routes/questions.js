import express from "express";
import * as questionController from "../controllers/questions/question.controller.js";

const router = express.Router();

router.post("/questions", questionController.addNewQuestion);

export default router;
