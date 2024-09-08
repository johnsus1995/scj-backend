const { successResponse, errorResponse } = require("../../helpers");
const { Question } = require("../../models");
const { Exam } = require("../../models");

const createQuestion = async (req, res) => {
  try {
    const { examId, question } = req.body;

    const exam = await Exam.findOne({
      where: { id: examId },
    });

    if (!exam) {
      throw new Error("Exam does not exist");
    }

    const payload = {
      examId,
      question,
    };

    const newQuestion = await Question.create(payload);
    return successResponse(req, res, newQuestion);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = {
  createQuestion,
};
