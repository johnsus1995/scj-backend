import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import publicRoutes from "./src/routes/public.js";

import apiMiddleware from "./src/middleware/apiAuth.js";
import adminMiddleware from "./src/middleware/adminAuth.js";
import errorHandler from "./src/middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/public", publicRoutes);
app.use(errorHandler);

app.use("/test", (req, res) => {
  res.json({ message: "hello world" });
});

export default app;
