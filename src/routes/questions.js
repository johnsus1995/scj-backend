import express from "express";
import * as questionController from "../controllers/questions/question.controller.js";
import verifyToken from "../middleware/apiAuth.js";

const router = express.Router();

router.post("/add", verifyToken, questionController.addNewQuestion);

export default router;