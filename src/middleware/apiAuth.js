import { errorResponse } from "../helpers/index.js";
import jwt from "jsonwebtoken";

const apiAuth = async (req, res, next) => {
  if (!(req.headers && req.headers["authorization"])) {
    return errorResponse(req, res, "Token is not provided", 401);
  }
  const token = req.headers["authorization"].substring(7);

  try {
   
    return next();
  } catch (error) {
    return errorResponse(
      req,
      res,
      "Incorrect token is provided, try re-login",
      401
    );
  }
};

export default apiAuth
