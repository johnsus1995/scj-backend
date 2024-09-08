const { successResponse, errorResponse } = require("../../helpers");
const { Exam } = require("../../models");

const createExam = async (req, res) => {
  try {
    const { title, description, deadline, createdBy, duration } = req.body;
    const payload = {
      title,
      description,
      deadline,
      createdBy,
      duration,
    };

    const newExam = await Exam.create(payload);
    return successResponse(req, res, newExam);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findOne({ where: { id } });

    if (!exam) {
      return errorResponse(req, res, 'Exam not found', 404);
    }

    // Delete the exam
    await exam.destroy();

    // Optionally, return the deleted exam data
    return successResponse(req, res, `Exam with ID ${id} has been deleted successfully`);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = {
  createExam,
  deleteExam
};
