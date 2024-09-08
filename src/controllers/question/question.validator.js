const Joi = require("joi");

const createQuestion = {
  body: {
    examId: Joi.number().required(),
    question: Joi.string().required(),
  },
};

module.exports = {
  createQuestion,
};
