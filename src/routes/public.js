import express from "express";
import * as userController from "../controllers/user/user.controller.js";

const router = express.Router();

//= ===============================
// Public routes
//= ===============================

router.post("/login", userController.login);
router.post("/register", userController.register);

export default router;
