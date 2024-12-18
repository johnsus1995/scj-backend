const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { User } = require("../../models");
const { successResponse, errorResponse, uniqueId } = require("../../helpers");
const { registerSchema, loginSchema } = require("./user.validator");

const allUsers = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 2;
    const users = await User.findAndCountAll({
      order: [
        ["createdAt", "DESC"],
        ["firstName", "ASC"],
      ],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { users });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const user = await User.scope("withSecretColumns").findOne({
      where: { email },
    });

    if (user) {
      throw new Error("User already exists with the same email, please login.");
    }

    await registerSchema
      .validate(req.body, { abortEarly: false })
      .catch((err) => {
        const validationErrors = err.errors;
        throw { message: "Validation failed", validationErrors };
      });

    const reqPass = crypto.createHash("md5").update(password).digest("hex");
    const payload = {
      email,
      firstName,
      lastName,
      password: reqPass,
      isVerified: false,
      verifyToken: uniqueId(),
    };

    await User.create(payload);
    return successResponse(res, {}, 200, "Register Success, please login now.");
  } catch (error) {
    if (error.validationErrors) {
      return errorResponse(
        req,
        res,
        error.message,
        400,
        error.validationErrors
      );
    }

    return errorResponse(req, res, error.message);
  }
};

const login = async (req, res) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false }).catch((err) => {
      const validationErrors = err.errors;
      throw { message: "Validation failed", validationErrors };
    });

    const user = await User.scope("withSecretColumns").findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      throw new Error("Incorrect Email Id/Password");
    }
    const reqPass = crypto
      .createHash("md5")
      .update(req.body.password || "")
      .digest("hex");
    if (reqPass !== user.password) {
      throw new Error("Incorrect Email Id/Password");
    }
    const token = jwt.sign(
      {
        user: {
          userId: user.id,
          email: user.email,
          createdAt: new Date(),
        },
      },
      process.env.SECRET
    );
    delete user.dataValues.password;
    return successResponse(res, { user, token }, 201, "Welcome back!");
  } catch (error) {
    if (error.validationErrors) {
      return errorResponse(
        req,
        res,
        error.message,
        400,
        error.validationErrors
      );
    }
    return errorResponse(req, res, error.message);
  }
};

const profile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findOne({ where: { id: userId } });
    return successResponse(req, res, { user });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const changePassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.scope("withSecretColumns").findOne({
      where: { id: userId },
    });

    const reqPass = crypto
      .createHash("md5")
      .update(req.body.oldPassword)
      .digest("hex");
    if (reqPass !== user.password) {
      throw new Error("Old password is incorrect");
    }

    const newPass = crypto
      .createHash("md5")
      .update(req.body.newPassword)
      .digest("hex");

    await User.update({ password: newPass }, { where: { id: user.id } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = {
  allUsers,
  register,
  profile,
  changePassword,
  login,
};
