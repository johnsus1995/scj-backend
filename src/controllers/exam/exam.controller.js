const { successResponse, errorResponse } = require("../../helpers");
const exam = require("../../models/exam");

const createExam = async (req, res) => {
  try {
    const { title, description, createdBy, duration } = req.body;
    const payload = {
      title,
      description,
      createdBy,
      duration,
    };
    const newExam = await exam.create(payload);
    return successResponse(req, res, { newExam });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
