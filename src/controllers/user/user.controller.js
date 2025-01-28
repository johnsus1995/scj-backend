import { usersTable } from "../../db/schema.js";
import db from "../../db/index.js"; // Assuming you have a db connection file
import { successResponse, errorResponse } from "../../helpers/index.js";
import { registerSchema } from "./user.validator.js";
import crypto from "crypto";
import { eq } from "drizzle-orm";

export const register = async (req, res) => {
  try {
    await registerSchema.validate(req.body, { abortEarly: false });

    const { scjId, name, roleId, email, password, isAdmin } = req.body;

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser.length > 0) {
      return errorResponse(
        req,
        res,
        "User already exists with this email",
        400
      );
    }

    const hashedPassword = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    const newUser = await db
      .insert(usersTable)
      .values({
        name,
        email,
        scjId,
        password: hashedPassword,
        roleId,
        isAdmin,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning("*");

    return successResponse(res, newUser, 201, "User registered successfully");
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = error.inner.map((err) => ({
        message: err.message,
      }));
      return errorResponse(
        req,
        res,
        "Validation failed",
        400,
        validationErrors
      );
    }
    return errorResponse(req, res, error.message, 401);
  }
};

export const login = async (req, res) => {
  //
};

export const allUsers = async (req, res) => {
  //
};

export const profile = async (req, res) => {
  //
};

export const changePassword = async (req, res) => {
  //
};
