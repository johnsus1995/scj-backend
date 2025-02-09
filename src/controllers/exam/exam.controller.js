import { examAttemptsTable, examsTable, usersTable } from "../../db/schema.js";
import db from "../../db/index.js"; // Assuming you have a db connection file
import { successResponse, errorResponse } from "../../helpers/index.js";
import { addNewExamSchema, attemptExamSchema } from "./exam.validator.js";
import { eq } from "drizzle-orm";

export const addNewExam = async (req, res) => {
  try {
    await addNewExamSchema.validate(req.body, { abortEarly: false });

    const { createdBy, title, description, deadline, duration, published } =
      req.body;

    const newExam = await db.insert(examsTable).values({
      createdBy,
      title,
      description,
      duration,
      deadline,
      published,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return successResponse(res, newExam, 201, "New exam added successfully");
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

/**
 * Get an exam by ID along with author details
 * @route GET /api/exams/:id
 */
export const getExamById = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await db
      .select({
        ...examsTable,
        author: {
          id: usersTable.id,
          name: usersTable.name,
        },
      })
      .from(examsTable)
      .leftJoin(usersTable, eq(examsTable.createdBy, usersTable.id))
      .where(eq(examsTable.id, id));

    if (!exam.length) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.json(exam[0]); // Send the first (and only) result
  } catch (error) {
    console.error("Error fetching exam:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Get an exam by ID along with author details
 * @route GET /api/exams/:id
 */
export const getAllExams = async (req, res) => {
  try {
    const { userId } = req.params;

    const exams = await db
      .select({
        ...examsTable,
        author: {
          id: usersTable.id,
          name: usersTable.name,
        },
      })
      .from(examsTable)
      .leftJoin(usersTable, eq(examsTable.createdBy, usersTable.id))
      .where(eq(examsTable.createdBy, userId));

    if (!exams.length) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.json(exams);
  } catch (error) {
    console.error("Error fetching exam:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const attemptExam = async (req, res) => {
  try {
    await attemptExamSchema.validate(req.body, { abortEarly: false });

    const { userId, examId } = req.body;

    const newExamAttempt = await db.insert(examAttemptsTable).values({
      userId,
      examId,
      startedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return successResponse(res, newExamAttempt, 201, "New exam attempt started");
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
