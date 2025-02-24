import { questionsTable } from "../../db/schema.js";
import db from "../../db/index.js";
import { successResponse, errorResponse } from "../../helpers/index.js";
import { addNewQuestionSchema } from "./question.validator.js";

export const addNewQuestion = async (req, res) => {
  try {
    await addNewQuestionSchema.validate(req.body, { abortEarly: false });

    const { examId, text } = req.body;

    const newQuestion = await db.insert(questionsTable).values({
      examId,
      text,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return successResponse(res, newQuestion, 201, "New question added.");
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
