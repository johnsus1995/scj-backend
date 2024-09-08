const Joi = require("joi");

const getOtherUserProfile = {
  body: {
    userId: Joi.number().required(),
  },
};

const changePassword = {
  body: {
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  },
};

const register = {
  body: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    profilePic:Joi.string().required(),
    isAdmin: Joi.boolean().required(),
    roleId: Joi.number().required(),
  },
};

const login = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

module.exports = {
  register,
  getOtherUserProfile,
  changePassword,
  login,
};
