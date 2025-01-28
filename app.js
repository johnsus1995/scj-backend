import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import publicRoutes from "./src/routes/public.js";

import apiMiddleware from "./src/middleware/apiAuth.js";
import adminMiddleware from "./src/middleware/adminAuth.js";
import errorHandler from "./src/middleware/errorHandler.js";

dotenv.config();
 
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use("/public", publicRoutes);
app.use(errorHandler);

export default app