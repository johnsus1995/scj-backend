import { attemptedAnswersTable, correctAnswersTable } from "../../db/schema.js";
import db from "../../db/index.js";
import { successResponse, errorResponse } from "../../helpers/index.js";
import { attemptAnswerSchema } from "./attemptedAnswers.validator.js";
import levenshtein from "fast-levenshtein";
import { and, eq } from "drizzle-orm";

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

    // ✅ Split the answer into words (clean out HTML tags)
    const cleanAnswerText = answerText
      .replace(/<[^>]*>/g, "") // Remove HTML tags like <p>, <b>, etc.
      .toLowerCase()
      .split(/\s+/); // Split by space

    // ✅ Fuzzy compare keywords
    let matchedKeywords = 0;
    const missedKeywords = [];

    keywords.forEach((keyword) => {
      let isMatched = false;

      // Check if the keyword (even with spelling mistakes) exists in the answerText
      cleanAnswerText.forEach((word) => {
        const distance = levenshtein.get(word, keyword.toLowerCase());

        if (distance <= 2) {
          // Distance of 2 means the word is approximately similar (fuzzy match)
          isMatched = true;
        }
      });

      if (isMatched) {
        matchedKeywords++;
      } else {
        missedKeywords.push(keyword);
      }
    });

    // ✅ Calculate Marks Based On Keywords
    const totalKeywords = keywords.length;
    const keywordMatchPercentage = (matchedKeywords / totalKeywords) * 100;
    let marksAwarded = 0;

    if (keywordMatchPercentage === 100) {
      marksAwarded = 10;
    } else if (keywordMatchPercentage >= 75) {
      marksAwarded = 7;
    } else if (keywordMatchPercentage >= 50) {
      marksAwarded = 5;
    } else if (keywordMatchPercentage >= 25) {
      marksAwarded = 3;
    } else {
      marksAwarded = 0;
    }

    const existingAnswer = await db
      .select()
      .from(attemptedAnswersTable)
      .where(
        and(
          eq(attemptedAnswersTable.attemptExamId, attemptExamId),
          eq(attemptedAnswersTable.questionId, questionId)
        )
      )
      .limit(1);

    if (existingAnswer.length) {
      const updatedAnswer = await db
        .update(attemptedAnswersTable)
        .set({
          answerText,
          marksAwarded,
          updatedAt: new Date(),
        })
        .where(eq(attemptedAnswersTable.id, existingAnswer[0].id))
        .returning();

      return successResponse(
        res,
        {
          marksAwarded,
          matchedKeywords,
          missedKeywords,
          percentage: keywordMatchPercentage.toFixed(2),
        },
        201,
        "Answer updated successfully."
      );
    }

    await db
      .insert(attemptedAnswersTable)
      .values({
        questionId,
        attemptExamId,
        answerText,
        marksAwarded,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return successResponse(
      res,
      {
        marksAwarded,
        matchedKeywords,
        missedKeywords,
        percentage: keywordMatchPercentage.toFixed(2),
      },
      201,
      "Answer evaluated successfully."
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
        422,
        validationErrors
      );
    }

    return errorResponse(req, res, error.message, 501);
  }
};

export const getAttemptedAnswers = async (req, res) => {
  try {
    const { attemptExamId } = req.query;

    const attemptedAnswers = await db
      .select()
      .from(attemptedAnswersTable)
      .where(eq(attemptedAnswersTable.attemptExamId, attemptExamId));

    return successResponse(res, attemptedAnswers, 200,'Attempted answers fetched successfully.');
  } catch (error) {
    return errorResponse(req, res, error.message, 501);
  }
}