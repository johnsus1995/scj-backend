import express from "express";
import * as userController from "../controllers/user/user.controller.js";

const router = express.Router();

router.get("/users", userController.allUsers);

export default router;
