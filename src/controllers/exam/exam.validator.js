const Joi = require("joi");

const createExam = {
  body: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    createdBy: Joi.number().required(),
    duration: Joi.string().required(),
  },
};

module.exports = {
  createExam,
};
