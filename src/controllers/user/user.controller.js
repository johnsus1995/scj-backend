import { usersTable } from "../../db/schema.js";
import db from "../../db/index.js"; // Assuming you have a db connection file
import { successResponse, errorResponse } from "../../helpers/index.js";
import { loginSchema, registerSchema } from "./user.validator.js";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    await registerSchema.validate(req.body, { abortEarly: false });

    const { scjId, name, roleId, email, password, isAdmin } = req.body;

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .then((users) => (users.length > 0 ? users[0] : null));

    if (existingUser) {
      return errorResponse(
        req,
        res,
        "User already exists with this email",
        400,
        null
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.insert(usersTable).values({
      name,
      email,
      scjId,
      password: hashedPassword,
      roleId,
      isAdmin,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return successResponse(
      res,
      userWithoutPassword,
      201,
      "User registered successfully"
    );
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
    console.error("Error occurred:", error);
    return errorResponse(req, res, error.message, 500);
  }
};

export const login = async (req, res) => {

  try {
    await loginSchema.validate(req.body, { abortEarly: false });

    const { email, password } = req.body;

    // Fetch user
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .then((users) => users[0]); // Extract first user

    if (!user) {
      throw new Error("Incorrect Email Id/Password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Incorrect Email Id/Password");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...userWithoutPassword } = user;

    return successResponse(
      res,
      { user: userWithoutPassword, token },
      200,
      "Welcome back!"
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      return errorResponse(req, res, "Validation failed", 400, error.errors);
    }
    return errorResponse(req, res, error.message, 500, null);
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await db.select().from(usersTable);
    return successResponse(res, users, 200, "users fetched");
  } catch (error) {
    return errorResponse(req, res, error.message, 501);
  }
};

export const profile = async (req, res) => {
  //
};

export const changePassword = async (req, res) => {
  //
};
