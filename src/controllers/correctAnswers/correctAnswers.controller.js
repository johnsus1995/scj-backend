import { correctAnswersTable, questionsTable } from "../../db/schema.js";
import db from "../../db/index.js";
import { successResponse, errorResponse } from "../../helpers/index.js";
import { addNewCorrectAnswerSchema } from "./correctAnswers.validator.js";

export const addNewCorrectAnswer = async (req, res) => {
  try {
    await addNewCorrectAnswerSchema.validate(req.body, { abortEarly: false });

    const { questionId, answerText, keywords } = req.body;

    const newCorrectAns = await db.insert(correctAnswersTable).values({
      questionId,
      answerText,
      keywords,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return successResponse(res, newCorrectAns, 201, "New newCorrectAns added.");
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = error.inner.map((err) => ({
        message: err.message,
      }));
      return errorResponse(
        req,
        res,
        "Validation failed",
        400,
        validationErrors
      );
    }
    console.error("Error occurred:", error);

    return errorResponse(req, res, error.message, 401);
  }
};
