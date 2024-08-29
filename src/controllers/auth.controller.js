import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().min(6).required(),
  phoneNumber: Joi.number().required(),
  scjRegId: Joi.string().required(),
  roleId: Joi.number().required(),
});

export const signUp = (req, res) => {
  try {
  } catch (error) {}
};
