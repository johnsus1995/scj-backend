const { successResponse, errorResponse } = require("../../helpers");
const { Question } = require("../../models");
const { Exam } = require("../../models");

const createAnswer = async (req, res) => {
  try {
    const { examId, questionId, answer } = req.body;

    const exam = await Exam.findOne({
      where: { id: examId },
    });

    if (!exam) {
      throw new Error("Exam does not exist");
    }

    const question = await Question.findOne({
      where: { id: questionId },
    });

    if (!question) {
      throw new Error("Question does not exist");
    }

    const payload = {
      examId,
      questionId,
      answer
    };

    const newQuestion = await Question.create(payload);
    return successResponse(req, res, newQuestion);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = {
  createAnswer,
};
