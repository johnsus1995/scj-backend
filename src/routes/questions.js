import express from "express";
import * as questionController from "../controllers/questions/question.controller.js";

const router = express.Router();

router.post("/add", questionController.addNewQuestion);

export default router;
