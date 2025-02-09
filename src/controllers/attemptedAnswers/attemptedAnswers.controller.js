import { attemptedAnswersTable, correctAnswersTable } from "../../db/schema.js";
import db from "../../db/index.js";
import { successResponse, errorResponse } from "../../helpers/index.js";
import { attemptAnswerSchema } from "./attemptedAnswers.validator.js";
import levenshtein from "fast-levenshtein";
import { eq } from "drizzle-orm";

export const attemptAnswer = async (req, res) => {
  try {
    await attemptAnswerSchema.validate(req.body, { abortEarly: false });

    const { attemptExamId, questionId, answerText } = req.body;

    const correctAnswer = await db
      .select()
      .from(correctAnswersTable)

      .where(eq(correctAnswersTable.questionId, questionId))
      .limit(1);

    if (!correctAnswer.length) {
      return errorResponse(
        req,
        res,
        "Correct answer not found for this question.",
        404
      );
    }


    const { answerText: correctText, keywords } = correctAnswer[0];


    // Fuzzy matching using Levenshtein distance
    const similarityScore =
      1 -
      levenshtein.get(answerText.toLowerCase(), correctText.toLowerCase()) /
        Math.max(answerText.length, correctText.length);

    // Check keyword presence
    let keywordMatches = 0;
    if (keywords && Array.isArray(keywords)) {
      const lowerCasedAnswer = answerText.toLowerCase();
      keywordMatches = keywords.filter((kw) =>
        lowerCasedAnswer.includes(kw.toLowerCase())
      ).length;
    }

    let marksAwarded = 0;
    if (similarityScore > 0.9) {
      marksAwarded = 10; // Full marks for near-perfect match
    } else if (similarityScore > 0.75) {
      marksAwarded = 7; // Partial marks for decent similarity
    } else if (keywordMatches > 0) {
      marksAwarded = 5; // Reward keywords even if sentence structure is different
    } else {
      marksAwarded = 2; // Minimal marks for attempt
    }


    const newAnsAttempt = await db.insert(attemptedAnswersTable).values({
      questionId,
      attemptExamId,
      answerText,
      marksAwarded,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return successResponse(
      res,
      newAnsAttempt,
      201,
      "New answer attempt submitted."
    );
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
