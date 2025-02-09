import { errorResponse } from "../helpers/index.js";
import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return errorResponse(req, res, "Token is not provided", 401);
    }

    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = decoded.user;

    return next();
  } catch (error) {
    return errorResponse(
      req,
      res,
      "Invalid or expired token, please re-login",
      401
    );
  }
};

export default verifyToken;
