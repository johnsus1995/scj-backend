const Joi = require("joi");

const createAnswer = {
  body: {
    examId: Joi.number().required(),
    questionId: Joi.number().required(),
    answer: Joi.string().required(),
  },
};

module.exports = {
  createAnswer,
};
