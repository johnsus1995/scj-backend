const express = require("express");
const dotenv = require("dotenv");

const bodyParser = require("body-parser");
const cors = require("cors");

const publicRoutes = require("./src/routes/public");

// const apiRoutes = require('./src/routes/api');
const examRoutes = require("./src/routes/exam");
const questionRoutes = require("./src/routes/question");
const adminRoutes = require("./src/routes/admin");
const apiMiddleware = require("./src/middleware/apiAuth");
const adminMiddleware = require("./src/middleware/adminAuth");
const errorHandler = require("./src/middleware/errorHandler");

dotenv.config();
require("./src/config/sequelize");
 
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use("/public", publicRoutes);
// app.use('/api', apiMiddleware, apiRoutes);
app.use("/api/exam", apiMiddleware, examRoutes);
app.use("/api/question", apiMiddleware, questionRoutes);

app.use("/api/admin", apiMiddleware, adminMiddleware, adminRoutes);
app.use(errorHandler);

module.exports = app;
