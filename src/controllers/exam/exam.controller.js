import { examsTable } from "../../db/schema.js";
import db from "../../db/index.js"; // Assuming you have a db connection file
import { successResponse, errorResponse } from "../../helpers/index.js";
import { addNewExamSchema } from "./exam.validator.js";

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
