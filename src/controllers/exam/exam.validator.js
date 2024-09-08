const Joi = require('joi');

export const validateCreateExam = {
  body: {
    title: Joi.string().required(),
    description:Joi.string().required(),
    createdBy:Joi.number().required(),
    duration:Joi.string().required(),
  },
};