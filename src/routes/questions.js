import express from "express";
import * as questionController from "../controllers/questions/question.controller.js";
import verifyToken from "../middleware/apiAuth.js";

const router = express.Router();

router.get("/", verifyToken, questionController.getAllQuestions);
router.post("/add", verifyToken, questionController.addNewQuestion);
router.post("/next", verifyToken, questionController.getNextQuestion);



export default router;