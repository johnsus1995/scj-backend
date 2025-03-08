import { examsTable, questionsTable } from "../../db/schema.js";
import db from "../../db/index.js";
import { successResponse, errorResponse } from "../../helpers/index.js";
import { addNewQuestionSchema } from "./question.validator.js";
import { eq } from "drizzle-orm";

export const addNewQuestion = async (req, res) => {
  try {
    await addNewQuestionSchema.validate(req.body, { abortEarly: false });

    const { examId, text } = req.body;

    const newQuestion = await db
      .insert(questionsTable)
      .values({
        examId,
        text,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return successResponse(res, newQuestion[0], 201, "New question added.");
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

export const getAllQuestions = async (req, res) => {
  const { examId } = req.query;

  try {
    const exams = await db
      .select()
      .from(examsTable)
      .where(eq(examsTable.id, examId));

    const questions = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.examId, examId));

    const resData = {
      exam: exams[0] || null,
      questions: questions,
    };

    return successResponse(res, resData, 200, "Listing questions");
  } catch (error) {
    return errorResponse(req, res, error.message, 401);
  }
};


export const getNextQuestion = async (req, res) => {
  const { examId } = req.query;

  try {
    
    const resData = null

    return successResponse(res, resData, 200, "Listing questions");
  } catch (error) {
    return errorResponse(req, res, error.message, 401);
  }
};
