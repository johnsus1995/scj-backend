import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import publicRoutes from "./src/routes/public.js";
import userRoutes from "./src/routes/users.js";
import examRoutes from "./src/routes/exams.js";
import questionRoutes from "./src/routes/questions.js";
import correctAnswerRoutes from "./src/routes/correctAnswers.js";
import attemptAnswerRoutes from "./src/routes/attemptAnswer.js";

import errorHandler from "./src/middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("common"));

app.use("/public", publicRoutes);
app.use("/api", userRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/correct", correctAnswerRoutes);
app.use("/api/answers", attemptAnswerRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

export default app;
